// Mentoring page functionality
let currentMentors = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadMentors();
});

// AI Mentoring Functions
function startAIMentoring() {
    document.querySelector('.mentoring-options').style.display = 'none';
    document.querySelector('.ai-chat-interface').style.display = 'flex';
    
    // Add initial AI message
    addMessage("Hello! I'm your AI mentor. How can I help you with your business today?', 'ai'");

}

function closeAIChat() {
    document.querySelector('.mentoring-options').style.display = 'grid';
    document.querySelector('.ai-chat-interface').style.display = 'none';
}


function sendMessage() {
    const input = document.getElementById('userMessage');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "That's an interesting point. Have you considered...",
                "Based on market trends, I would suggest...",
                "Let's analyze this from a different perspective...",
                "Here's what successful entrepreneurs typically do in this situation..."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'ai');
        }, 1000);
    }
}

function addMessage(text, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Human Mentoring Functions
function showMentorsList() {
    document.querySelector('.mentoring-options').style.display = 'none';
    document.querySelector('.mentors-list').style.display = 'block';
}

function closeMentorsList() {
    document.querySelector('.mentoring-options').style.display = 'grid';
    document.querySelector('.mentors-list').style.display = 'none';
}

function loadMentors() {
    // Simulated mentors data
    currentMentors = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Strategy | Former VP at TechGiant",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            domain: "tech",
            expertise: ["Product", "UX", "Go-to-Market"],
            bio: "20+ years experience in product development and strategy for tech startups and Fortune 500 companies."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Venture Capital | Partner at Horizon VC",
            image: "https://randomuser.me/api/portraits/men/67.jpg",
            domain: "finance",
            expertise: ["Funding", "Finance", "Scaling"],
            bio: "Investor with focus on early-stage tech startups. Has helped raise over $50M for portfolio companies."
        },
        // Add more mentors...
    ];

    displayMentors(currentMentors);
}

function displayMentors(mentors) {
    const grid = document.getElementById('mentorsGrid');
    grid.innerHTML = mentors.map(mentor => `
        <div class="mentor-card">
            <div class="mentor-header">
                <div class="mentor-avatar">
                    <img src="${mentor.image}" alt="${mentor.name}">
                </div>
                <div class="mentor-info">
                    <h3>${mentor.name}</h3>
                    <p>${mentor.role}</p>
                </div>
            </div>
            <div class="mentor-body">
                <div class="mentor-expertise">
                    ${mentor.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
                </div>
                <p class="mentor-bio">${mentor.bio}</p>
            </div>
            <div class="mentor-footer">
                <button class="btn btn-primary" onclick="showMentorDetails(${mentor.id})">View Profile</button>
                <button class="btn btn-outline" onclick="scheduleMeeting(${mentor.id})">Schedule Call</button>
            </div>
        </div>
    `).join('');
}

function filterMentors(searchTerm = '') {
    const domain = document.querySelector('.search-filters select').value;
    let filtered = currentMentors;

    if (searchTerm) {
        filtered = filtered.filter(mentor => 
            mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (domain) {
        filtered = filtered.filter(mentor => mentor.domain === domain);
    }

    displayMentors(filtered);
}

function showMentorDetails(mentorId) {
    const mentor = currentMentors.find(m => m.id === mentorId);
    const modal = document.getElementById('mentorModal');
    const details = document.getElementById('mentorDetails');
    
    details.innerHTML = `
        <div class="mentor-profile">
            <img src="${mentor.image}" alt="${mentor.name}" class="mentor-profile-image">
            <h2>${mentor.name}</h2>
            <p class="mentor-role">${mentor.role}</p>
            <div class="mentor-expertise">
                ${mentor.expertise.map(exp => `<span class="expertise-tag">${exp}</span>`).join('')}
            </div>
            <p class="mentor-bio">${mentor.bio}</p>
            <button class="btn btn-primary btn-block" onclick="scheduleMeeting(${mentor.id})">Schedule Video Call</button>
        </div>
    `;

    modal.classList.add('active');
    document.getElementById('mentorOverlay').classList.add('active');
}

function closeMentorModal() {
    document.getElementById('mentorModal').classList.remove('active');
    document.getElementById('mentorOverlay').classList.remove('active');
}

function scheduleMeeting(mentorId) {
    // Implement video call scheduling functionality
    alert('Video call scheduling will be implemented in the future.');
}