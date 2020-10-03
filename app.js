const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const shopRouter = require('./controller/ShopRouter')

const server = express()

server.set('view engine','ejs')
server.use(bodyParser.urlencoded())
server.use(express.static(path.join(__dirname,'assets')))
server.use('/shop',shopRouter)

server.get('/',(req,res)=>
{
    console.log('home page open')
    res.render('home')
})


server.listen(5502,()=>
{
    console.log('http://localhost:5502')
})