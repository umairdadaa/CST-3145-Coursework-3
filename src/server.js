const express = require('express');
const mongodb = require('mongodb');
const app = express();

// Connection URI and database name
const uri = 'mongodb+srv://umairdada:04l4VOrpogsaIZtw@cluster0.0synoa4.mongodb.net/test';
const dbName = 'webstore';

// Create a new MongoClient
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the server and start the Express server once connected
client.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Express server started on port 3000');
    });
  }
});

// Route to retrieve the products collection
app.get('/products', (req, res) => {
  const collection = client.db(dbName).collection('products');
  collection.find().toArray((err, products) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.json(products);
    }
  });
});
