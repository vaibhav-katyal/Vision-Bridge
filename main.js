// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the stars animation
    initStars()

    // Add animation to stats counters
    animateStats()

    // Add smooth scrolling for navigation links
    initSmoothScroll()

    // Add event listeners to buttons
    document.getElementById("get-started-btn").addEventListener("click", () => {
        window.location.href = "auth.html"
    })

    document.getElementById("learn-more-btn").addEventListener("click", () => {
        const featuresSection = document.querySelector(".features-section")
        featuresSection.scrollIntoView({ behavior: "smooth" })
    })
})

// Function to initialize stars animation
function initStars() {
    // Create stars dynamically for a more random distribution
    const starsContainer = document.querySelector(".stars-container")

    // Clear existing stars
    const existingStars = document.querySelectorAll("#stars, #stars2, #stars3")
    existingStars.forEach((star) => (star.innerHTML = ""))

    // Create new stars
    const stars1 = document.getElementById("stars")
    const stars2 = document.getElementById("stars2")
    const stars3 = document.getElementById("stars3")

    // Create small stars
    createStars(stars1, 200, 1)

    // Create medium stars
    createStars(stars2, 100, 2)

    // Create large stars
    createStars(stars3, 50, 3)
}

// Function to create stars
function createStars(container, count, size) {
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div")
        star.className = "star"
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDelay = `${Math.random() * 5}s`
        star.style.animationDuration = `${50 + Math.random() * 50}s`

        fragment.appendChild(star)
    }

    container.appendChild(fragment)
}

// Function to animate stats counters
function animateStats() {
    const mentorCount = document.getElementById("mentor-count")
    const startupCount = document.getElementById("startup-count")
    const investmentCount = document.getElementById("investment-count")

    if (mentorCount && startupCount && investmentCount) {
        animateCounter(mentorCount, 0, 500, 2000)
        animateCounter(startupCount, 0, 1200, 2500)
        animateCounter(investmentCount, 0, 50, 3000, "$", "M+")
    }
}

// Function to animate a counter
function animateCounter(element, start, end, duration, prefix = "", suffix = "+") {
    let startTimestamp = null
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const value = Math.floor(progress * (end - start) + start)
        element.textContent = `${prefix}${value}${suffix}`

        if (progress < 1) {
            window.requestAnimationFrame(step)
        }
    }

    window.requestAnimationFrame(step)
}

// Function to initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                })
            }
        })
    })
}

// Function to show loader
function showLoader() {
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
      <div class="loader-text">Loading...</div>
    `

    document.body.appendChild(loader)

    return loader
}

// Function to hide loader
function hideLoader(loader) {
    loader.classList.remove("active")

    setTimeout(() => {
        loader.remove()
    }, 300)
}

