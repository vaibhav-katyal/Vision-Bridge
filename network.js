// Network page functionality
let posts = [];
let connections = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadConnections();
});

function loadPosts() {
    // Simulated posts data
    posts = [
        {
            id: 1,
            user: {
                name: "John Doe",
                role: "Founder & CEO",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            content: "Excited to announce our latest product launch! After months of hard work, we're finally ready to share it with the world. #startup #innovation",
            image: "https://picsum.photos/800/400",
            timestamp: "2 hours ago",
            likes: 42,
            comments: 8,
            shares: 12
        },
        // Add more posts...
    ];

    displayPosts();
}

function loadConnections() {
    // Simulated connections data
    connections = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Manager at TechCorp",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Startup Founder",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg"
        },
        // Add more connections...
    ];

    displayConnections();
}

function displayPosts() {
    const feed = document.getElementById('postsFeed');
    feed.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <img src="${post.user.avatar}" alt="${post.user.name}" class="user-avatar">
                <div class="post-user-info">
                    <span class="post-user-name">${post.user.name}</span>
                    <span class="post-user-role">${post.user.role}</span>
                    <span class="post-timestamp">${post.timestamp}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `
                    <div class="post-media">
                        <img src="${post.image}" alt="Post image">
                    </div>
                ` : ''}
            </div>
            <div class="post-actions-bar">
                <div class="post-action" onclick="likePost(${post.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    <span>${post.likes}</span>
                </div>
                <div class="post-action" onclick="showComments(${post.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>${post.comments}</span>
                </div>
                <div class="post-action" onclick="sharePost(${post.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    <span>${post.shares}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function displayConnections() {
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = connections.map(connection => `
        <div class="suggestion-card">
            <img src="${connection.avatar}" alt="${connection.name}" class="user-avatar">
            <div class="suggestion-info">
                <span class="suggestion-name">${connection.name}</span>
                <span class="suggestion-role">${connection.role}</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="connect(${connection.id})">Connect</button>
        </div>
    `).join('');
}

function previewMedia(input) {
    const preview = document.getElementById('mediaPreview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.innerHTML = `
                <div class="media-preview-item">
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-media" onclick="removeMedia()">×</button>
                </div>
            `;
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

function removeMedia() {
    document.getElementById('mediaPreview').innerHTML = '';
    document.getElementById('mediaInput').value = '';
}

function createPost() {
    const content = document.getElementById('postContent').value.trim();
    const mediaPreview = document.getElementById('mediaPreview');
    
    if (!content && !mediaPreview.innerHTML) {
        alert('Please add some content to your post');
        return;
    }

    // Create new post object
    const newPost = {
        id: posts.length + 1,
        user: {
            name: "John Doe", // Use logged in user's info
            role: "Entrepreneur",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        content: content,
        image: mediaPreview.querySelector('img')?.src,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0
    };

    // Add to posts array
    posts.unshift(newPost);

    // Clear form
    document.getElementById('postContent').value = '';
    removeMedia();

    // Refresh posts display
    displayPosts();
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        displayPosts();
    }
}

function showComments(postId) {
    // Implement comments functionality
    alert('Comments feature coming soon!');
}

function sharePost(postId) {
    // Implement share functionality
    alert('Share feature coming soon!');
}

function connect(connectionId) {
    const connection = connections.find(c => c.id === connectionId);
    if (connection) {
        alert(`Connection request sent to ${connection.name}!`);
    }
}