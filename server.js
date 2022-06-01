'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./books');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// connect mongoDB via mongoose
mongoose.connect(process.env.MONGODB_URI);

// error handling via mongoose
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

app.get('/', (req, res) => {

  res.send('test request received')

})

app.get('/books', async (req, res) => {
  const books = await Book.find({});

  //how to send a query
  // const books = await Book.find({status: 'available'});
  // const books = await Book.find({status: req.query.status});

  res.send(books);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
