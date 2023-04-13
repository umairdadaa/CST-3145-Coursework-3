// const ObjectID = require("bson");
const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const app = express();

app.use(express.json());

// port = process.env.PORT || 3000;


app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

// Logger
app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to: " + request.url);
    next();
});
app.use((express.static("public")));


const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb+srv://umairdada:04l4VOrpogsaIZtw@cluster0.0synoa4.mongodb.net',(err, client)=> {
    db = client.db('webstore')
})


app.get('/', (req,res,next) => {
    res.send('Select a collection, e.g, /collection/messages')
})

app.param('collectionName', (req,res,next,collectionName) =>{
    req.collection = db.collection(collectionName)
    return next()
})

// Get collection
app.get('/collection/:collectionName', (req,res,next) => {
    req.collection.find({}).toArray((e,results) => {
        if(e) return next(e)
        res.send(results)
    })
})

app.get('/hello', (req,res,next) => {
    res.send('Hello World')
})


const port = process.env.PORT || 3000;
app.listen(port, function() {
console.log("App started on port: " + port);
});