// Investments page functionality
let currentInvestors = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadInvestors();
});

function loadInvestors() {
    // Simulated investors data
    currentInvestors = [
        {
            id: 1,
            name: "Horizon Ventures",
            type: "Venture Capital Firm",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            sector: "tech",
            focus: ["SaaS", "AI/ML", "Enterprise Software"],
            description: "Early-stage technology investor with a focus on breakthrough innovations.",
            portfolio: ["TechCo", "AI Solutions", "CloudScale"],
            investmentRange: "$500K - $5M",
            location: "San Francisco, CA"
        },
        {
            id: 2,
            name: "Healthcare Innovation Fund",
            type: "Strategic Investor",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            sector: "health",
            focus: ["Digital Health", "Medical Devices", "Biotechnology"],
            description: "Specialized fund focusing on revolutionary healthcare solutions.",
            portfolio: ["HealthTech", "MedDevice", "BioInnovate"],
            investmentRange: "$1M - $10M",
            location: "Boston, MA"
        },
        // Add more investors...
    ];

    displayInvestors(currentInvestors);
}

function displayInvestors(investors) {
    const grid = document.getElementById('investorsGrid');
    grid.innerHTML = investors.map(investor => `
        <div class="investor-card" onclick="showInvestorDetails(${investor.id})">
            <div class="investor-header">
                <div class="investor-avatar">
                    <img src="${investor.image}" alt="${investor.name}">
                </div>
                <div class="investor-info">
                    <h3>${investor.name}</h3>
                    <p>${investor.type}</p>
                </div>
            </div>
            <div class="investor-body">
                <div class="investor-focus">
                    ${investor.focus.map(f => `<span class="focus-tag">${f}</span>`).join('')}
                </div>
                <p class="investor-description">${investor.description}</p>
                <div class="investor-details">
                    <div class="detail-item">
                        <span class="detail-label">Investment Range:</span>
                        <span class="detail-value">${investor.investmentRange}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${investor.location}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterInvestors(searchTerm = '') {
    const sector = document.querySelector('.search-filters select').value;
    let filtered = currentInvestors;

    if (searchTerm) {
        filtered = filtered.filter(investor => 
            investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            investor.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (sector) {
        filtered = filtered.filter(investor => investor.sector === sector);
    }

    displayInvestors(filtered);
}

function showInvestorDetails(investorId) {
    const investor = currentInvestors.find(i => i.id === investorId);
    const modal = document.getElementById('investorModal');
    const details = document.getElementById('investorDetails');
    
    details.innerHTML = `
        <div class="investor-profile">
            <img src="${investor.image}" alt="${investor.name}" class="investor-profile-image">
            <h2>${investor.name}</h2>
            <p class="investor-type">${investor.type}</p>
            <div class="investor-focus">
                ${investor.focus.map(f => `<span class="focus-tag">${f}</span>`).join('')}
            </div>
            <p class="investor-description">${investor.description}</p>
            <div class="investor-portfolio">
                <h3>Portfolio Companies</h3>
                <div class="portfolio-list">
                    ${investor.portfolio.map(company => `<span class="portfolio-item">${company}</span>`).join('')}
                </div>
            </div>
            <div class="investor-details">
                <div class="detail-item">
                    <span class="detail-label">Investment Range:</span>
                    <span class="detail-value">${investor.investmentRange}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${investor.location}</span>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.getElementById('investorOverlay').classList.add('active');
}

function closeInvestorModal() {
    document.getElementById('investorModal').classList.remove('active');
    document.getElementById('investorOverlay').classList.remove('active');
}

function connectWithInvestor() {
    // Implement connection functionality
    alert('Connection request sent! The investor will be notified of your interest.');
    closeInvestorModal();
}