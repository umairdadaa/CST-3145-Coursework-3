const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware to parse request bodies as JSON
app.use(express.json());

// Set up CORS headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to the MongoDB database
MongoClient.connect('mongodb+srv://umairdada:04l4VOrpogsaIZtw@cluster0.0synoa4.mongodb.net/test', { useNewUrlParser: true })
  .then((client) => {
    const db = client.db('webstore');

    // Define a route to retrieve all products
    app.get('/products', (req, res, next) => {
      const collection = db.collection('products');

      collection.find({}).toArray()
        .then((products) => {
          res.json(products);
        })
        .catch((error) => {
          next(error);
        });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server started on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
