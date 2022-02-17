import _ from 'lodash';
import fetch from 'node-fetch';

async function getPost(postId) {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const data = await post.json();

  return data;
}

async function getAllPosts() {
  const posts = [];

  _.each(
    Array.from({ length: 10 }, (v, i) => i + 1),
    (id) => {
      const post = getPost(id).then((response) => response);
      posts.push(post);
    },
  );

  try {
    return await Promise.all(posts);
  } catch (error) {
    return error;
  }
}

async function getPosts(req, res) {
  const posts = await getAllPosts();

  res.status(200).json({ posts });
}

async function getAddress(req, res) {
  const address = await fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((user) => user.address);

  res.status(200).json({ address });
}

export { getPosts, getAddress };
