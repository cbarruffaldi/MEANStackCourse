const express = require('express');
var bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully',
  });
});

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {
    id: 1,
    title: 'Title 1',
    content: 'Message 1 from server'
    },
    {
      id: 2,
      title: 'Title 2',
      content: 'Message 2 from server'
      }
];
  res.status(200).json({
    message: 'Post fetched succesfully',
    posts: posts
  });
});

module.exports = app;
