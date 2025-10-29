const express = require('express');
const router = express.Router();

let posts = [
  { id: 1, name: 'Mr A' },
  { id: 2, name: 'Mrs B' },
  { id: 3, name: 'Miss C' },
];

// Get all posts (with optional limit)
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Create new post
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newPost = {
    id: posts.length + 1,
    name
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  post.name = name;
  res.status(200).json(post);
});
// Delete post
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts = posts.filter((d) => d.id !== id);
  res.status(204).json(posts); // 204 = No Content (successful delete)
});

module.exports = router;
