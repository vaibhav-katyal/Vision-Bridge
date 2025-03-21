// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the dashboard
    initDashboard();

    // Retrieve the full name from session storage
    const fullName = sessionStorage.getItem("fullName");

    // Display the full name in the profile section
    if (fullName) {
        document.querySelector(".profile-name").textContent = fullName;
        document.querySelector(".profile-info-large h2").textContent = fullName;
    }

    // Add page navigation functionality
    const navLinks = document.querySelectorAll(".sidebar-nav a");
    const mainContent = document.querySelector(".main-content");

    navLinks.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();

            // Update active link
            navLinks.forEach(l => l.parentElement.classList.remove("active"));
            link.parentElement.classList.add("active");

            // Get the page name from the href
            const page = link.getAttribute("href").substring(1);

            // Update header title
            document.querySelector(".header-left h1").textContent =
                link.querySelector("span").textContent;

            // Show loading state
            mainContent.innerHTML = `
                   <div class="loading-animation">
                       <div class="loader">
                           <svg viewBox="0 0 80 80">
                               <circle id="loader-circle" cx="40" cy="40" r="32" stroke="url(#loader-gradient)"/>
                           </svg>
                       </div>
                       <div class="loader-text">Loading...</div>
                   </div>
               `;

            try {
                // Load the page content
                const response = await fetch(`pages/${page}.html`);
                const html = await response.text();

                // Create a temporary container
                const temp = document.createElement('div');
                temp.innerHTML = html;

                // Extract the content
                const content = temp.querySelector('body').innerHTML;
                mainContent.innerHTML = content;

                // Load and execute the page's JavaScript
                const script = document.createElement('script');
                script.src = `pages/${page}.js`;
                document.body.appendChild(script);
            } catch (error) {
                console.error('Error loading page:', error);
                mainContent.innerHTML = '<div class="error">Error loading page content</div>';
            }

            // Close mobile sidebar if open
            if (window.innerWidth < 992) {
                document.getElementById("sidebar").classList.remove("active");
                document.getElementById("overlay").classList.remove("active");
            }
        });
    });
});

// Function to initialize the dashboard
function initDashboard() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle")
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed")
            mainContent.classList.toggle("expanded")
        })
    }

    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active")
            document.getElementById("overlay").classList.toggle("active")
        })
    }

    // Close sidebar when clicking on overlay
    const overlay = document.getElementById("overlay")
    if (overlay) {
        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active")
            overlay.classList.remove("active")
            document.getElementById("profile-popup").classList.remove("active")
            document.getElementById("delete-account-modal").classList.remove("active")
        })
    }

    // Profile popup functionality
    const profileTrigger = document.getElementById("profile-trigger")
    const profilePopup = document.getElementById("profile-popup")
    const closeProfile = document.getElementById("close-profile")

    if (profileTrigger && profilePopup) {
        profileTrigger.addEventListener("click", () => {
            profilePopup.classList.add("active")
            overlay.classList.add("active")
        })
    }

    if (closeProfile) {
        closeProfile.addEventListener("click", () => {
            profilePopup.classList.remove("active")
            overlay.classList.remove("active")
        })
    }

    // Delete account modal functionality
    const deleteAccountBtn = document.getElementById("delete-account-btn")
    const deleteAccountModal = document.getElementById("delete-account-modal")
    const cancelDelete = document.getElementById("cancel-delete")
    const closeModal = document.querySelector(".close-modal")
    const confirmDelete = document.getElementById("confirm-delete")

    if (deleteAccountBtn && deleteAccountModal) {
        deleteAccountBtn.addEventListener("click", () => {
            deleteAccountModal.classList.add("active")
            overlay.classList.add("active")
        })
    }

    if (cancelDelete) {
        cancelDelete.addEventListener("click", () => {
            deleteAccountModal.classList.remove("active")
            overlay.classList.remove("active")
        })
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            deleteAccountModal.classList.remove("active")
            overlay.classList.remove("active")
        })
    }

    if (confirmDelete) {
        confirmDelete.addEventListener("click", () => {
            // Show loader
            const loader = document.createElement("div")
            loader.className = "loader-container active"
            loader.innerHTML = `
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <defs>
                <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#3a86ff" />
                  <stop offset="100%" stop-color="#4cc9f0" />
                </linearGradient>
              </defs>
              <circle id="loader-circle" cx="40" cy="40" r="32" stroke="url(#loader-gradient)" />
            </svg>
          </div>
          <div class="loader-text">Deleting account...</div>
        `

            document.body.appendChild(loader)

            // Simulate account deletion
            setTimeout(() => {
                // Redirect to index page
                window.location.href = "index.html"
            }, 2000)
        })
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logout-btn")

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Show loader
            const loader = document.createElement("div")
            loader.className = "loader-container active"
            loader.innerHTML = `
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <defs>
                <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#3a86ff" />
                  <stop offset="100%" stop-color="#4cc9f0" />
                </linearGradient>
              </defs>
              <circle id="loader-circle" cx="40" cy="40" r="32" stroke="url(#loader-gradient)" />
            </svg>
          </div>
          <div class="loader-text">Logging out...</div>
        `

            document.body.appendChild(loader)

            // Simulate logout
            setTimeout(() => {
                // Redirect to index page
                window.location.href = "index.html"
            }, 1500)
        })
    }

    // Task checkbox functionality
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]')

    taskCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const taskItem = this.closest(".task-item")

            if (this.checked) {
                taskItem.classList.add("completed")
            } else {
                taskItem.classList.remove("completed")
            }
        })
    })

    // Navigation functionality
    const navLinks = document.querySelectorAll(".sidebar-nav a")

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            // Update active link
            navLinks.forEach((l) => l.parentElement.classList.remove("active"))
            this.parentElement.classList.add("active")

            // Update header title
            const title = this.querySelector("span").textContent
            document.querySelector(".header-left h1").textContent = title

            // Close mobile sidebar
            if (window.innerWidth < 992) {
                sidebar.classList.remove("active")
                overlay.classList.remove("active")
            }

            // In a real application, you would load the corresponding content here
            // For this demo, we'll just show a loading animation
            showPageLoading()
        })
    })

    // Initialize animations
    initDashboardAnimations()
}

// Function to show page loading animation
function showPageLoading() {
    const content = document.querySelector(".dashboard-content")

    // Store original content
    const originalContent = content.innerHTML

    // Show loading animation
    content.innerHTML = `
      <div class="loading-animation" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50vh;">
        <div class="loader">
          <svg viewBox="0 0 80 80">
            <defs>
              <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3a86ff" />
                <stop offset="100%" stop-color="#4cc9f0" />
              </linearGradient>
            </defs>
            <circle id="loader-circle" cx="40" cy="40" r="32" stroke="url(#loader-gradient)" />
          </svg>
        </div>
        <div class="loader-text" style="margin-top: 1rem; font-size: 1.25rem; color: var(--text);">Loading...</div>
      </div>
    `

    // Simulate page loading
    setTimeout(() => {
        // Restore original content
        content.innerHTML = originalContent

        // Re-initialize animations
        initDashboardAnimations()
    }, 1000)
}

// Function to initialize dashboard animations
function initDashboardAnimations() {
    // Animate stats
    animateStats()

    // Animate progress bar
    animateProgressBar()

    // Add hover effects
    addHoverEffects()
}

// Function to animate stats
function animateStats() {
    const statValues = document.querySelectorAll(".stat-value")

    statValues.forEach((stat) => {
        const value = stat.textContent
        stat.textContent = "0"

        // Extract the number from the value
        const match = value.match(/(\d+)/)
        if (match) {
            const number = Number.parseInt(match[1])

            // Animate the number
            const start = 0
            const duration = 1500
            const startTime = performance.now()

            function updateNumber(currentTime) {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)

                const currentValue = Math.floor(progress * number)
                stat.textContent = value.replace(number, currentValue)

                if (progress < 1) {
                    requestAnimationFrame(updateNumber)
                }
            }

            requestAnimationFrame(updateNumber)
        }
    })
}

// Function to animate progress bar
function animateProgressBar() {
    const progressBars = document.querySelectorAll(".progress-fill")

    progressBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"

        setTimeout(() => {
            bar.style.width = width
        }, 300)
    })
}

// Function to add hover effects
function addHoverEffects() {
    // Add hover effect to cards
    const cards = document.querySelectorAll(".stat-card, .mentor-card, .meeting-card")

    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-5px)"
            this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)"
        })

        card.addEventListener("mouseleave", function () {
            this.style.transform = ""
            this.style.boxShadow = ""
        })
    })
}

