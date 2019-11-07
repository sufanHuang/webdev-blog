#### Using Docker MongoDB Image to Create A Blog Full-stack App

As I mentioned in _[Docker and Kitematic](dockerAndKitematic.html)_ article, I started to learn Docker in order to use different databases for 
a blog admin app. These are the steps I took for using mongoDB image on Kitematic:

* Create MongoD container at Kitematic UI. In couple seconds it is running, the UI provides two parameters to use:
  `DOCKER PORT 27017/tcp` and `ACCESS URL localhost:32678`.
* Use the `ACCESS URL` in _server.js_ file:

````javascript
 mongoose.connect("mongodb://localhost:32777",{
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
````

And that is it! MongoDB is running as the backend database. Just simple as that.

The rest of my _server.js_ looks like this:
````javascript
    const express = require("express")
    const mongoose  = require("mongoose")
    const router = require("./routes/index")
    const app = express()
    const port = 8000
    app.use(express.json())
    app.use("/api",router)
    
    mongoose.connect("mongodb://localhost:32777",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
      
    app.listen(port,()=>{
        console.log(`server is running at ${port}`)
    });
````

The CRUD routes and functions look like this in `routes/index.js`:
````javascript
const express = require ('express')
const router = express.Router()
const Post = require('../models/Post.js')
const to = require('await-to-js').default

router.get('/posts', async(req, res)=>{
    let [ error, result ] = await to(Post.find())
    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(result)
})

router.get('/posts/:id', async(req,res)=>{
    let { id } = req.params
    let [ error, result ] = await to(Post.findOne({_id:id}))
    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(result)
})

router.post('/posts', async(req, res)=>{
    const { title, author, imageURL, content } = req.body
    const newPost = new Post({
        title,
        author,
        imageURL,
        content,
        createdAt: Date()
    })

    let [ error ] = await to( newPost.save())
    console.log(title, author, imageURL, content)
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('adding post')
})

router.delete('/posts/:id', async(req,res)=>{
    let { id } = req.params
    let [ error ]= await to(Post.deleteOne({_id:id}))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('deleting post')
})

router.put('/posts/:id', async(req, res)=>{
    let { id } = req.params
    let { title, imageURL, content } = req.body
    let [ error ]= await to(Post.updateOne(
        {_id:id},
        { $set:{title, imageURL, content}}
    ))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('updating post')

})
module.exports = router
````

The mongoDB schema for this app looks like this:
````javascript
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)
````
And that is all the back-end code for this app. I've used react.js for the frontend code. Here is the link of the whole
project on [Github](https://github.com/sufanHuang/mern-blog).

These are the documentation that I referred to when writing back-end code:

* [Kitematic Userguide](https://docs.docker.com/kitematic/userguide/)
* [Container Networking](https://docs.docker.com/config/containers/container-networking/)
* [MongoDB CRUD Operation](https://docs.mongodb.com/manual/crud/)

Docker container is a joy to use, mongoDB database is up in seconds with couple clicks on Kitematic. Fun!

I did similar steps for PostgreSQL image on Kitematic. You can find the finished project on github 
[PostgreSQL-Blog](https://github.com/sufanHuang/postgreSQL-blog).

While I tried to do the same thing with elasticsearch image on Kitematic, I've encountered some problems 
that leaded me to use Docker CLI. I would write about it next.
