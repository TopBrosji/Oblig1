// Function to fetch posts from JSONPlaceholder API
async function fetchPosts(start, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
    return await response.json();
}

// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;
    return postElement;
}

// Variables to keep track of posts
let currentPostsCount = 0;
const postsPerPage = 3;

// Function to load more posts
async function loadMorePosts() {
    const posts = await fetchPosts(currentPostsCount, postsPerPage);
    const postsContainer = document.getElementById('posts-container');
    
    posts.forEach(post => {
        postsContainer.appendChild(createPostElement(post));
    });
    
    currentPostsCount += posts.length;
}

// If scrolled to bottom
function isScrolledToBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
}

// Event listener for scroll
window.addEventListener('scroll', () => {
    if (isScrolledToBottom()) {
        loadMorePosts();
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', loadMorePosts);