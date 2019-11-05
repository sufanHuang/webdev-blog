const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))
app.get('/', (req,res)=>{
 res.sendFile(__dirname + '/public/index.html')
})



app.listen(process.env.PORT,()=>{
    console.log('server is running on port 3000')
})
