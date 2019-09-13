var request = require('request');

const chalk  = require('chalk');

//var urlRoot = "https://api.github.com";
// NCSU Enterprise endpoint:
var urlRoot = "https://api.github.ncsu.edu";

var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.GITHUBTOKEN;

if( !config.token )
{
	console.log(chalk`{red.bold GITHUBTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));


if (process.env.NODE_ENV != 'test')
{
	(async () => {
		await listAuthenicatedUserRepos();
		let user = await getUser();
		await listBranches(user, "REST-API");
		await createRepo(user,"test");
		await createIssue(user, "test", "First issue","Body of the first issue");
		await enableWikiSupport(user,"test");

	})()
}

function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint,
		method: method,
		headers: {
			"User-Agent": "CSC510-REST-WORKSHOP",
			"content-type": "application/json",
			"Authorization": `token ${config.token}`
		}
	};
	return options;
}

function getDefaultOptionsForCreateRepo(endpoint, method, repo)
{
	var options = {
                url: urlRoot + endpoint,
                method: method,
                headers: {
                        "User-Agent": "CSC510-REST-WORKSHOP",
                        "content-type": "application/json",
                        "Authorization": `token ${config.token}`
                },
		body: JSON.stringify({
			"name" : repo,
			"description" : "Creating a new repo via REST API for HW1 CSC510",
			"private": true})

        };
        return options;
}

function getDefaultOptionsForCreateIssue(endpoint, method, issueName, issueBody)
{
        var options = {
                url: urlRoot + endpoint,
                method: method,
                headers: {
                        "User-Agent": "CSC510-REST-WORKSHOP",
                        "content-type": "application/json",                                                                                                                                 "Authorization": `token ${config.token}`
                },
                body: JSON.stringify({
                        "title" : issueName,
                        "body" : issueBody})
        };
        return options;
}

function getDefaultOptionsForEnableWikiSupport(endpoint, method, repo)
{
        var options = {
                url: urlRoot + endpoint,
                method: method,
                headers: {
                        "User-Agent": "CSC510-REST-WORKSHOP",
                        "content-type": "application/json",                                                                                                                                 "Authorization": `token ${config.token}`
                },
                body: JSON.stringify({
                        "name" : repo,
                        "has_wiki" : true})
        };
        return options;
}

async function getUser()
{
	let options = getDefaultOptions("/user", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) {
			resolve( JSON.parse(body).login );
		});
	});
}

function listAuthenicatedUserRepos()
{
	console.log(chalk.green("listAuthenicatedUserRepos() : Printing the list of repositories"));
	let options = getDefaultOptions("/user/repos?visibility=all", "GET");

	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if( error )
			{
				console.log( chalk.red( error ));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			for( var i = 0; i < obj.length; i++ )
			{
				var name = obj[i].name;
				console.log( name );
			}

			// Return object for people calling our method.
			resolve( obj );
		});
	});

}

// 1. Write code for listBranches in a given repo under an owner. See list branches
async function listBranches(owner,repo)
{
	console.log(chalk.green("listBranches(owner,repo) : Listing the branches for [" + owner + "'s] [" + repo + "] repository"));
	let options = getDefaultOptions("/repos/" + owner + "/" + repo + "/branches", "GET");
	
	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body)
		{
			if( error )
			{
				console.log( chalk.red( error ));
				reject(error);
				return; // Terminate execution.
			}

			var obj = JSON.parse(body);
			for( var i = 0; i < obj.length; i++)
			{
				var name = obj[i].name;
				console.log(name);
			}
			// Return object for people calling our method.
                        resolve( obj );
		});
	});
}

// 2. Write code to create a new repo
async function createRepo(owner,repo)
{
	console.log(chalk.green("createRepo(owner,repo) : Creating a new repository [" + repo + "] for [" + owner + "]"));
	let options = getDefaultOptionsForCreateRepo("/user/repos", "POST", repo);
	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if(error)
			{
				console.log( chalk.red(error));
				reject(error);
				return; //Terminate execution
			}
			var obj = JSON.parse(body);
			if(response.statusCode == 201)
			{
				console.log(chalk.green("Successfully created a new repository [" + repo + "] for [" + owner + "]"));
			}
			else
			{
				console.log(chalk.red("Failure in creating a new repository [" + repo + "] for [" + owner + "] due to error code [" + response.statusCode + "] and error message [" + obj["errors"][0].message + "]"));
			}
			resolve( response.statusCode );
		});
	});

}
// 3. Write code for creating an issue for an existing repo.
async function createIssue(owner,repo, issueName, issueBody)
{	
	console.log(chalk.green("createIssue(owner,repo,issueName,issueBody) : Creating an issue in repository [" + repo + "] for [" + owner + "]"));
	let options = getDefaultOptionsForCreateIssue("/repos/" + owner + "/" + repo + "/issues", "POST", issueName, issueBody);
	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if(error)
                        {
                                console.log( chalk.red(error));
                                reject(error);
                                return; //Terminate execution
                        }
                        var obj = JSON.parse(body);
                        if(response.statusCode == 201)
                        {
                                console.log(chalk.green("Successfully created a new issue in [" + repo + "] for [" + owner + "]"));
                        }
                        else
                        {
                                console.log(chalk.red("Failure in creating a new issue in [" + repo + "] for [" + owner + "] due to error code [" + response.statusCode + "] and error message [" + obj["errors"][0].message + "]"));
                        }

			resolve( response.statusCode );
		});
	});
}

// 4. Write code for editing a repo to enable wiki support.
async function enableWikiSupport(owner,repo)
{
	console.log(chalk.green("enableWikiSupport(owner,repo) : Enabling wiki support of repository [" + repo + "] for [" + owner + "]"));
	let options = getDefaultOptionsForEnableWikiSupport("/repos/" + owner + "/" + repo, "PATCH", repo);
	// Send a http request to url and specify a callback that will be called upon its return.
	return new Promise(function(resolve, reject)
	{
		request(options, function (error, response, body) 
		{
			if(error)
			{
				console.log( chalk.red(error));
                                reject(error);
                                return; //Terminate execution
                        }
			var obj = JSON.parse(body);
			if(obj.has_wiki == true)
			{
				console.log(chalk.green("Successfully enable wiki support in [" + repo + "] for [" + owner + "]"));
			}

			resolve( JSON.parse(body) );
		});
	});	
}

module.exports.getUser = getUser;
module.exports.listAuthenicatedUserRepos = listAuthenicatedUserRepos;
module.exports.listBranches = listBranches;
module.exports.createRepo = createRepo;
module.exports.createIssue = createIssue;
module.exports.enableWikiSupport = enableWikiSupport;
