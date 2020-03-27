const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
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
