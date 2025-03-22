document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin();

    // Sidebar Toggle with Persistent Button
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");
    
    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        mainContent.classList.toggle("expanded");
    });

    // Ensure toggle button stays inside the sidebar
    sidebarToggle.style.position = "absolute";
    sidebarToggle.style.right = "15px";
    sidebarToggle.style.top = "15px";
    sidebarToggle.style.zIndex = "10";
    // Navigation Fix (Prevent Fading Out)
    const navItems = document.querySelectorAll(".nav-item");
    const contentSections = document.querySelectorAll(".content-section");

    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            navItems.forEach((nav) => nav.classList.remove("active"));
            this.classList.add("active");
            
            const sectionId = this.getAttribute("data-section");
            contentSections.forEach((section) => {
                section.classList.remove("active");
                section.style.opacity = 1;
                
                if (section.id === sectionId) {
                    section.classList.add("active");
                    gsap.from(section, { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" });
                }
            });
        });
    });
  
     // Countdown Timer Fix
     function updateCountdown() {
        const now = new Date();
        const targetTime = new Date();
        targetTime.setHours(14, 0, 0, 0);
        if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
        const diff = targetTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();
  
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
  
     // Calendar Fix (Dynamic Month Updates with Current Date Highlight)
     function updateCalendar(month, year) {
        const calendarDays = document.querySelector(".calendar-days");
        const calendarTitle = document.querySelector(".calendar-header h2");
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const today = new Date();
        const currentDate = today.getDate();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        
        calendarDays.innerHTML = "";
        calendarTitle.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("day", "empty");
            calendarDays.appendChild(emptyDiv);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = i;
            
            if (isCurrentMonth && i === currentDate) {
                dayDiv.classList.add("current-day");
                dayDiv.style.backgroundColor = "#00d68f";
                dayDiv.style.color = "#fff";
                dayDiv.style.borderRadius = "50%";
            }
            
            calendarDays.appendChild(dayDiv);
        }
    }
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    document.querySelector(".calendar-nav.prev").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentMonth, currentYear);
    });
    document.querySelector(".calendar-nav.next").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentMonth, currentYear);
    });
    updateCalendar(currentMonth, currentYear);
  
     // Chat Section - Enable Switching Between Contacts
     // Chat Section - Enable Switching & Sending Messages
    const chatContacts = document.querySelectorAll(".chat-contact");
    const chatUserName = document.querySelector(".chat-user h3");
    const chatMessages = document.getElementById("chat-messages");
    const chatUserImage = document.querySelector(".chat-user img");
    const chatInput = document.getElementById("chat-input");
    const chatSendBtn = document.getElementById("chat-send-btn");

    let currentChatUser = "Sarah (CloudScale)";

    const chatData = {
        "Sarah (CloudScale)": [],
        "Mike (DataViz)": [],
        "Lisa (NexGen AI)": [],
        "David (EcoSmart)": []
    };

    function loadChat(user) {
        chatMessages.innerHTML = "";
        if (chatData[user].length === 0) {
            chatMessages.innerHTML = "<p class='no-messages'>No messages yet. Start a conversation!</p>";
        } else {
            chatData[user].forEach(msg => {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message", msg.type);
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <p>${msg.text}</p>
                        <span class="message-time">${msg.time}</span>
                    </div>
                `;
                chatMessages.appendChild(messageDiv);
            });
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatContacts.forEach(contact => {
        contact.addEventListener("click", function () {
            document.querySelector(".chat-contact.active")?.classList.remove("active");
            this.classList.add("active");

            currentChatUser = this.querySelector("h3").textContent;
            chatUserName.textContent = currentChatUser;
            chatUserImage.src = this.querySelector("img").src;

            loadChat(currentChatUser);
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", "sent");
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatData[currentChatUser].push({ type: "sent", text: message, time: timeString });
        chatInput.value = "";

        setTimeout(() => {
            const responses = [
                "I'll check with our team and get back to you.",
                "That’s a great point! We'll incorporate that feedback.",
                "Thanks for sharing the update!",
                "Looking forward to our next session."
            ];
            const botReply = responses[Math.floor(Math.random() * responses.length)];
            
            const replyDiv = document.createElement("div");
            replyDiv.classList.add("message", "received");
            replyDiv.innerHTML = `
                <div class="message-content">
                    <p>${botReply}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;

            chatMessages.appendChild(replyDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatData[currentChatUser].push({ type: "received", text: botReply, time: timeString });
        }, Math.random() * 2000 + 1000);
    }

    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Load initial chat
    loadChat(currentChatUser);
});
 
  
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
    
      const profileImage = document.querySelector(".profile-image img");
      if (profileImage) {
          profileImage.addEventListener("click", () => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.addEventListener("change", (event) => {
                  const file = event.target.files[0];
                  if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                          profileImage.src = e.target.result;
                      };
                      reader.readAsDataURL(file);
                  }
              });
              input.click();
          });
      }
  
    })
  
    
   


