// DOM elements
const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

// Get and show all posts
async function showPosts() {
  try {
    const res = await fetch('http://localhost:3000/api/posts'); // fetch posts from server
    if (!res.ok) throw new Error('Failed to fetch posts');

    const posts = await res.json();
    output.innerHTML = ''; // clear previous posts

    // display each post
    posts.forEach(post => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Add a new post
async function addPost(e) {
  e.preventDefault();

  const formData = new FormData(form); // get data from form
  const title = formData.get('title');

  if (!title) return alert('Please enter a title'); // REMEMBER: validate input

  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }), // send JSON body
    });

    if (!res.ok) throw new Error('Failed to add post');

    await res.json(); // we don't need to store full posts array here
    showPosts(); // refresh the list after adding
  } catch (error) {
    console.error('Error adding post:', error);
  }
}

// Event listeners
button.addEventListener('click', showPosts); // click button to fetch posts
form.addEventListener('submit', addPost);     // submit form to add new post
