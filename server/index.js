const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const crypto = require('crypto');
let filename = "data.json";
let hash = crypto.createHash('md5').update(filename).digest("hex");
let uuid = hash.substring(0,6);
// express configuration
app.use(express.json({type: '*/*'}));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', function (req, res) {
    res.send(`Received object. ${JSON.stringify(req.body)}`);
});

app.post('/share', function(req, res) 
{
    let data = JSON.stringify(req.body,null,2);
    fs.writeFileSync(filename,data);
    res.send(JSON.stringify({"success":true,"link":"http://localhost:3000/" + uuid})+ "\n");
});

app.get('/' + uuid, function(req,res) {
    if ( process.env.EXECUTED != 'DONE') 
    {
    	let data = fs.readFileSync(filename);
    	res.send(JSON.stringify(JSON.parse(data)) + "\n"); 
    	process.env.EXECUTED = 'DONE'; 
    }
    else {
	res.send(JSON.stringify({"success":false,"error":404,"message":"Not Found"}) + "\n");
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
