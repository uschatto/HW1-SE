# HW1
**REST CLIENT**

***Output from node index.js command***
> **listAuthenicatedUserRepos()**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/listrepos.PNG" width="700" height="150">
</p>

> **listBranches(owner,repo)**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/listbranches.PNG" width="700" height="100">
</p>

> **createRepo(owner,repo)**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/createrepo1.PNG" width="800" height="50">
</p>

<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/createrepo2.PNG" width="800" height="100">
</p>

> **createIssue(owner,repo,issueName,issueBody)**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/createissue1.PNG" width="800" height="50">
</p>

<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/createissue2.PNG" width="800" height="300">
</p>

> **enableWikiSupport(owner,repo)**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/enablewiki.PNG" width="800" height="50">
</p>

> **npm test screenshot**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/npmtest.PNG" width="700" height="300">
</p>

**REST SERVER**

> **Output from curl commands**
<p align="center"> 
<img src="https://github.ncsu.edu/uschatto/HW1-510/blob/master/resources/imgs/restserver.PNG" width="900" height="150">
</p>

**CONCEPTS**

1) The main drawback according to me with using REST protocol is that it is built on top of HTTP 1.1 protocol. HTTP 1.1 is big and complex and comes with a lot of disadvantages which are later resolved in HTTP 2.0. But HTTP 1.1 which REST uses, initiates TCP handshake with each and every request. This not only eats up the bandwidth because of the additional and redundant data in the headers but it will also add on to the latency and hence hit the performance. It also leads to head-of-line blocking where a request can get stuck behind a slow request and hit the response time. REST only supports request-response model available with HTTP 1.1 and does not allow streaming.

2.a) Disadvantages of REST - 

> The major difference between REST and GraphQL is the way data is fetched from the server. With REST it either leads to over-fetching  where in you load all the data with a particular endpoint even if you do not require half of it or under-fetching where in you load some data and then fetch again to load some more data based on the previous data. With GraphQL you can specify exactly what you wish to receive. Another major difference between REST and GraphQL is that in REST the server defines what data is to be returned while in GraphQL the server only declares the available data and the client specifies what should be returned.

> REST does not support strongly typed data where as GraphQL does.

2.b) Benefits of REST - 

> REST supports HTTP caching which eliminates the need to send full requests or responses in case data has been cached from previous requests. GraphQL on the other hand has no inherent caching mechanism.
