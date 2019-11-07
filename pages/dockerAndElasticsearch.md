####  Launching Elasticsearch and Kibana Through Docker CLI

AS I get comfortable using Docker using Katematic, I want to try out elasticsearch image. I have read about Elasticsearch
but have never made a project with it. So this would be my first project with Elasticsearch, using Docker container.

When I tried to launch Elasticsearch(the official one) image as well as Kibana image in Kitematic UI, both would show 404 error. 
There is DOCKER CLI icon at the left low corner at Kitematic UI. It is time to get used to DOCKER CLI. 

[Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) helps me from here. 
These are steps I took:
* Pulling elasticsearch image:
````javascript
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.2
````
* Starting a cluster with docker:
````javascript
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.2
````

After done, DOCKER CLI would give status of the image, take note for the name or ID of this image, we will need it for connecting
to Kibana.

[Running Kibana on Docker](https://www.elastic.co/guide/en/kibana/current/docker.html) is the documentation I referred to 
to launch Kibana. These are steps I took:
* Pulling the image:
````javascript
docker pull docker.elastic.co/kibana/kibana:7.4.2
````
*Running Kibana on Docker and Connected to Elasticsearch container:
````javascript
docker run --link YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID:elasticsearch -p 5601:5601
````

Replace YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID with previous step, in my case I put down
````javascript
docker run --link vigilant_brattain:elasticsearch -p 5601:5601
````

Now type `docker ps` on `DOCKER CLI`, you will see both images running, together all other running images you have.
I went back to Kitematic UI, both images are also showing up on the left.

The default port for Elasticsearch is 9200, you can also find it at Settings/Hostname at Kitematic UI of the image.
`localhost:5601` is the url to open Kibana.

Now it is done with DOCKER CLI Kitematic interface. Time to turn to my Intellij IDE.

There are two steps to connect Elasticsearch with server. First is  `npm install @elastic/elasticsearch`. Second, there
lines of code as these:

````javascript
const { Client } = require("@elastic/elasticsearch")
const client = new Client({node: 'http://localhost:9200'})
const index = 'posts'
````
Elasticsearch doesn't like uppercase in index(table in SQL language) name, I only found out after the server gave me error message.

The CRUD operations look like this in my _server.js_ file:
````javascript
app.get('/api/posts/:id', async(req,res)=>{
    const { id } = req.params
    let parameters ={
        index,
        body:{
            query:{
                match: {_id:id}
            }
        }
    }
    let [ error, result] = await to (client.search(parameters))
    if(error){
        res.send(error)
    }
    let item =_.get(result,"body.hits.hits[0]")
    let outputItem = _.assign( { id: item._id}, item._source)
    if(outputItem){
       res.json(outputItem)
    } else {
        console.log("item not found")
    }


})

app.post('/api/posts', async (req, res)=>{
    const { title, author, imageURL, content} = req.body
    let parameters = {
        index,
        body:{
            title,
            author,
            imageURL,
            content,
            createdAt:Date()
        }
    }
    let [ error ] =await to (client.index(parameters))
    if(error){
        res.send(error)
    }
    res.send('adding a post')
})

app.delete('/api/posts/:id', async(req,res)=>{
    const { id } = req.params
    let parameters = {
        id,
        index
    }
    let [error] =await to(client.delete(parameters))
    if(error){
        res.send(error)
    }
    res.send("deleting a post")
})

app.put('/api/posts/:id', async(req, res)=>{
    const { id } = req.params
    const { title,imageURL, content}=req.body
    let parameters = {
        id,
        index,
        body:{
            doc: {
                title,
                imageURL,
                content
            }
        }
    }

    let [ error, result] = await to (client.update(parameters))
    if(error){
        res.send(error)
    }
    res.send(result)
})
````

Elasticsearch data output has nested object, It took me a while to figure out how to put it in
a flat object. _lodash library_ has a lot of array functions to help manipulate data. Here is how I use `_assign` to take
care of the nested object:
* In get-all-posts function:
````javascript
    let items = _.get(result, 'body.hits.hits')
    let outputData = _.map(items, (currentItem) => {
        return _.assign({ id: currentItem._id}, currentItem._source)
    })
````
* In get-one-post function:
````javascript
    let item =_.get(result,"body.hits.hits[0]")
    let outputItem = _.assign( { id: item._id}, item._source)
````

These are documentation that helped me in this project:
* [Install Elasticsearch with Docker](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
* [Running Kibana on Docker](https://www.elastic.co/guide/en/kibana/current/docker.html)
* [ELK-Docker](https://elk-docker.readthedocs.io/)
* [Elasticsearch API Refernce](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/api-reference.html)

Here is the finished project with frontend on [Github](https://github.com/sufanHuang/elasticsearch-blog)
