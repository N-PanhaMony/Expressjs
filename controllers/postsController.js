let posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post Two' },
  { id: 3, title: 'Post Three' },
];

// @desc   Get all posts
// @route  GET /api/posts
const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  // if limit is valid, return limited posts, else return all
  res.status(200).json(!isNaN(limit) && limit > 0 ? posts.slice(0, limit) : posts);
};

// @desc   Get single post
// @route  GET /api/posts/:id
const getPost = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: `A post with the id of ${req.params.id} was not found` });
  res.status(200).json(post);
};

// @desc   Create new post
// @route  POST /api/posts
const createPost = (req, res) => {
  const title = req.body?.title; // safe optional chaining
  if (!title) return res.status(400).json({ error: 'Please include a title in the request body' });

  const newPost = { id: posts.length + 1, title };
  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc   Update post
// @route  PUT /api/posts/:id
const updatePost = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: `A post with the id of ${req.params.id} was not found` });

  post.title = req.body?.title || post.title; // only update if title provided
  res.status(200).json(posts);
};

// @desc   Delete post
// @route  DELETE /api/posts/:id
const deletePost = (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: `A post with the id of ${req.params.id} was not found` });

  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.status(200).json(posts);
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
