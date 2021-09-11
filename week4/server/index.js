const express = require('express');
const mongoose = require('mongoose');
const Posts = require('./models/posts');

const app = express();

/* ----- Middlewares -------*/
app.use(express.json());

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const postsData = {
    title,
    content,
  };
  const response = await Posts.create(postsData);
  res.json({
    success: true,
    post: {
      ...response._doc,
    },
  });
});

app.get('/posts', async (req, res) => {
  const posts = await Posts.find({});
  res.json({
    success: true,
    posts,
  });
});

app.get('/posts/:id', async (req, res) => {
  const posts = await Posts.findById(req.params.id);
  res.json({
    success: true,
    posts,
  });
});

app.patch('/posts:id', (req, res) => {});

app.delete('/posts/:id', (req, res) => {});

// Connect to MongoDB database
mongoose
  .connect(
    'mongodb://admin:testpassword@localhost:27017/okcoders?authSource=admin',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(8082, () => console.log('server started on 8082'));
  })
  .catch((e) => {
    console.log('Error connecting to MongoDB: ', e);
  });
