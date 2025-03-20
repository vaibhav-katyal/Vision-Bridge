document.addEventListener("DOMContentLoaded", () => {
    // Import GSAP
    gsap.registerPlugin()
  
    // Sidebar Toggle
    const sidebarToggle = document.getElementById("sidebar-toggle")
    const sidebar = document.querySelector(".sidebar")
  
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  
    // Navigation
    const navItems = document.querySelectorAll(".nav-item")
    const contentSections = document.querySelectorAll(".content-section")
  
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all nav items
        navItems.forEach((nav) => nav.classList.remove("active"))
  
        // Add active class to clicked nav item
        this.classList.add("active")
  
        // Show corresponding content section
        const sectionId = this.getAttribute("data-section")
        contentSections.forEach((section) => {
          section.classList.remove("active")
          if (section.id === sectionId) {
            section.classList.add("active")
  
            // Apply entrance animation
            gsap.from(section, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.out",
            })
          }
        })
      })
    })
  
    // Countdown Timer
    function updateCountdown() {
      // Set the target time (2:00 PM today)
      const now = new Date()
      const targetHour = 14 // 2 PM
      const targetMinute = 0
  
      const targetTime = new Date(now)
      targetTime.setHours(targetHour, targetMinute, 0, 0)
  
      // If the target time has already passed today, set it for tomorrow
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1)
      }
  
      // Calculate the time difference
      const diff = targetTime - now
  
      // Calculate hours, minutes, and seconds
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
      // Update the countdown elements
      const countdownElement = document.getElementById("countdown")
      const sessionCountdownElement = document.getElementById("session-countdown")
  
      if (countdownElement) {
        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`
      }
  
      if (sessionCountdownElement) {
        sessionCountdownElement.textContent = `${hours}h ${minutes}m`
      }
    }
  
    // Update countdown every second
    setInterval(updateCountdown, 1000)
    updateCountdown() // Initial update
  
    // Request Actions
    const acceptButtons = document.querySelectorAll(".accept-btn")
    const rejectButtons = document.querySelectorAll(".reject-btn")
  
    acceptButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const requestId = this.getAttribute("data-id")
        const row = this.closest(".table-row")
  
        // Animate the row
        gsap.to(row, {
          backgroundColor: "rgba(0, 214, 143, 0.1)",
          borderLeft: "3px solid var(--success-color)",
          duration: 0.3,
        })
  
        // Replace buttons with "Accepted" text
        const actionsCell = this.closest(".actions-cell")
        actionsCell.innerHTML = '<span style="color: var(--success-color);">Accepted</span>'
  
        // You would typically send an AJAX request to update the server
        console.log(`Request ${requestId} accepted`)
      })
    })
  
    rejectButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const requestId = this.getAttribute("data-id")
        const row = this.closest(".table-row")
  
        // Animate the row
        gsap.to(row, {
          backgroundColor: "rgba(255, 61, 113, 0.1)",
          borderLeft: "3px solid var(--danger-color)",
          duration: 0.3,
        })
  
        // Replace buttons with "Rejected" text
        const actionsCell = this.closest(".actions-cell")
        actionsCell.innerHTML = '<span style="color: var(--danger-color);">Rejected</span>'
  
        // You would typically send an AJAX request to update the server
        console.log(`Request ${requestId} rejected`)
      })
    })
  
    // Calendar Navigation
    const calendarPrev = document.querySelector(".calendar-nav.prev")
    const calendarNext = document.querySelector(".calendar-nav.next")
    const calendarTitle = document.querySelector(".calendar-header h2")
  
    if (calendarPrev && calendarNext) {
      let currentMonth = new Date().getMonth()
      let currentYear = new Date().getFullYear()
  
      calendarPrev.addEventListener("click", () => {
        currentMonth--
        if (currentMonth < 0) {
          currentMonth = 11
          currentYear--
        }
        updateCalendarTitle()
      })
  
      calendarNext.addEventListener("click", () => {
        currentMonth++
        if (currentMonth > 11) {
          currentMonth = 0
          currentYear++
        }
        updateCalendarTitle()
      })
  
      function updateCalendarTitle() {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
        calendarTitle.textContent = `${months[currentMonth]} ${currentYear}`
      }
    }
  
    // Chat Functionality
    const chatInput = document.getElementById("chat-input")
    const chatSendBtn = document.getElementById("chat-send-btn")
    const chatMessages = document.getElementById("chat-messages")
  
    if (chatInput && chatSendBtn && chatMessages) {
      chatSendBtn.addEventListener("click", sendMessage)
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage()
        }
      })
  
      function sendMessage() {
        const message = chatInput.value.trim()
        if (message === "") return
  
        // Get current time
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const ampm = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`
  
        // Create message element
        const messageElement = document.createElement("div")
        messageElement.className = "message sent"
        messageElement.innerHTML = `
                  <div class="message-content">
                      <p>${message}</p>
                      <span class="message-time">${timeString}</span>
                  </div>
              `
  
        // Add message to chat
        chatMessages.appendChild(messageElement)
  
        // Clear input
        chatInput.value = ""
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
  
        // Simulate a response after 1-3 seconds
        setTimeout(simulateResponse, Math.random() * 2000 + 1000)
      }
  
      function simulateResponse() {
        const responses = [
          "I'll check with our team and get back to you.",
          "That's a great point! We'll incorporate that feedback.",
          "Yes, I do have several contacts at VC firms specializing in cloud infrastructure. I'll send you some introductions after our session today.",
          "Thanks for sharing the updated deck. I'll review it before our call.",
        ]
  
        // Get current time
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const ampm = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`
  
        // Create message element
        const messageElement = document.createElement("div")
        messageElement.className = "message received"
        messageElement.innerHTML = `
                  <img src="/placeholder.svg?height=40&width=40" alt="User">
                  <div class="message-content">
                      <p>${responses[Math.floor(Math.random() * responses.length)]}</p>
                      <span class="message-time">${timeString}</span>
                  </div>
              `
  
        // Add message to chat
        chatMessages.appendChild(messageElement)
  
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  
    // Animate Stats on Load
    function animateStats() {
      const statValues = document.querySelectorAll(".stat-value")
  
      statValues.forEach((stat) => {
        const value = stat.textContent
        stat.textContent = "0"
  
        // Animate the number
        const start = 0
        const end = Number.parseInt(value.replace(/[^\d.-]/g, ""))
        const duration = 1500
        const startTime = new Date().getTime()
  
        function updateNumber() {
          const currentTime = new Date().getTime()
          const elapsed = currentTime - startTime
  
          if (elapsed < duration) {
            const progress = elapsed / duration
            const current = Math.round(progress * end)
  
            // Format with currency symbol if needed
            if (value.includes("$")) {
              stat.textContent = "$" + current.toLocaleString()
            } else {
              stat.textContent = current.toLocaleString()
            }
  
            requestAnimationFrame(updateNumber)
          } else {
            stat.textContent = value
          }
        }
  
        updateNumber()
      })
  
      // Animate chart bars
      const chartFills = document.querySelectorAll(".chart-fill")
      chartFills.forEach((fill) => {
        const height = fill.style.height
        fill.style.height = "0%"
  
        gsap.to(fill, {
          height: height,
          duration: 1.5,
          ease: "power2.out",
        })
      })
    }
  
    // Run animations when dashboard is shown
    if (document.getElementById("dashboard").classList.contains("active")) {
      animateStats()
    }
  
    // Run animations when switching to dashboard
    navItems.forEach((item) => {
      if (item.getAttribute("data-section") === "dashboard") {
        item.addEventListener("click", animateStats)
      }
    })
  
    // Mobile Responsiveness
    function checkMobile() {
      if (window.innerWidth <= 576) {
        sidebar.classList.add("collapsed")
  
        // Create mobile toggle button if it doesn't exist
        if (!document.querySelector(".mobile-toggle")) {
          const mobileToggle = document.createElement("button")
          mobileToggle.className = "mobile-toggle"
          mobileToggle.innerHTML = "☰"
          mobileToggle.style.cssText = `
                      position: fixed;
                      top: 20px;
                      left: 20px;
                      z-index: 1001;
                      background-color: var(--primary-color);
                      color: white;
                      border: none;
                      border-radius: 5px;
                      width: 40px;
                      height: 40px;
                      font-size: 1.5rem;
                      cursor: pointer;
                      box-shadow: 0 0 10px var(--primary-glow);
                  `
  
          document.body.appendChild(mobileToggle)
  
          mobileToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open")
          })
        }
      } else {
        // Remove mobile toggle if screen is larger
        const mobileToggle = document.querySelector(".mobile-toggle")
        if (mobileToggle) {
          mobileToggle.remove()
        }
  
        sidebar.classList.remove("open")
      }
    }
  
    // Check on load and resize
    checkMobile()
    window.addEventListener("resize", checkMobile)
  
    // Initialize GSAP animations
    gsap.from(".stats-container .stat-card", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    })
  
    gsap.from(".ai-insights-box", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.out",
    })
  
    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
        })
      })
  
      button.addEventListener("mouseleave", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
        })
      })
    })
  
    // Add hover effects to cards
    const cards = document.querySelectorAll(".stat-card, .startup-card, .reward-card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        gsap.to(this, {
          y: -5,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px var(--primary-glow)",
          duration: 0.3,
        })
      })
  
      card.addEventListener("mouseleave", function () {
        gsap.to(this, {
          y: 0,
          boxShadow: "var(--neu-shadow-dark)",
          duration: 0.3,
        })
      })
    })
  
    // Copy referral link functionality
    const referralLink = document.querySelector(".referral-link")
    const copyLinkBtn = document.querySelector(".referral-section .primary-btn")
  
    if (referralLink && copyLinkBtn) {
      copyLinkBtn.addEventListener("click", function () {
        referralLink.select()
        document.execCommand("copy")
  
        // Show copied notification
        const originalText = this.textContent
        this.textContent = "Copied!"
  
        setTimeout(() => {
          this.textContent = originalText
        }, 2000)
      })
    }
  })
  
  