// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the authentication page
    initAuthPage()
})

// Function to initialize the authentication page
function initAuthPage() {
    // Tab switching functionality
    const tabs = document.querySelectorAll(".auth-tab")
    const forms = document.querySelectorAll(".auth-form")
    const tabSlider = document.querySelector(".auth-tab-slider")

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabId = tab.getAttribute("data-tab")

            // Update active tab
            tabs.forEach((t) => t.classList.remove("active"))
            tab.classList.add("active")

            // Update active form
            forms.forEach((form) => {
                form.classList.remove("active")
                if (form.id === `${tabId}-form`) {
                    form.classList.add("active")
                }
            })
        })
    })

    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll(".toggle-password")

    togglePasswordButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const input = button.previousElementSibling
            const type = input.getAttribute("type") === "password" ? "text" : "password"
            input.setAttribute("type", type)

            // Update icon
            const eyeIcon = button.querySelector(".eye-icon")
            if (type === "text") {
                eyeIcon.innerHTML =
                    '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'
            } else {
                eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
            }
        })
    })

    // User type selection in signup
    const userTypeOptions = document.querySelectorAll(".user-type-option")

    userTypeOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const userType = option.getAttribute("data-type")

            // Update active option
            userTypeOptions.forEach((opt) => opt.classList.remove("active"))
            option.classList.add("active")

            // Store the selected user type
            document.querySelector("#signup-form").setAttribute("data-selected-type", userType)
        })
    })

    // Multi-step form navigation
    const nextButtons = document.querySelectorAll(".next-step")
    const prevButtons = document.querySelectorAll(".prev-step")

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStep = button.closest(".signup-step")
            const nextStepNumber = button.getAttribute("data-next")
            const form = currentStep.closest("form")
            const selectedUserType = form.getAttribute("data-selected-type") || "entrepreneur"

            // Validate current step
            if (!validateStep(currentStep)) {
                showValidationError()
                return
            }

            // Hide current step
            currentStep.classList.remove("active")

            // Show next step based on user type
            let nextStep

            if (nextStepNumber === "2") {
                // For step 2, show the appropriate step based on user type
                nextStep = form.querySelector(`.signup-step[data-step="2"][data-user-type="${selectedUserType}"]`)
            } else {
                // For other steps, just find the step by number
                nextStep = form.querySelector(`.signup-step[data-step="${nextStepNumber}"]`)
            }

            if (nextStep) {
                nextStep.classList.add("active")
            }
        })
    })

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStep = button.closest(".signup-step")
            const prevStepNumber = button.getAttribute("data-prev")
            const form = currentStep.closest("form")
            const selectedUserType = form.getAttribute("data-selected-type") || "entrepreneur"

            // Hide current step
            currentStep.classList.remove("active")

            // Show previous step
            let prevStep

            if (prevStepNumber === "2") {
                // For step 2, show the appropriate step based on user type
                prevStep = form.querySelector(`.signup-step[data-step="2"][data-user-type="${selectedUserType}"]`)
            } else {
                // For other steps, just find the step by number
                prevStep = form.querySelector(`.signup-step[data-step="${prevStepNumber}"]`)
            }

            if (prevStep) {
                prevStep.classList.add("active")
            }
        })
    })

    // Form submission
    const signinForm = document.getElementById("signin-form")
    const signupForm = document.getElementById("signup-form")

    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Retrieve the full name from local storage
        const fullName = localStorage.getItem("fullName");

        // Store the full name in session storage
        sessionStorage.setItem("fullName", fullName);

        // Show loader
        const loader = document.getElementById("auth-loader");
        loader.classList.add("active");

        // Simulate authentication
        setTimeout(() => {
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        }, 2000);
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get the full name from the signup form
        const fullName = document.getElementById("signup-name").value;

        // Store the full name in local storage
        localStorage.setItem("fullName", fullName);

        // Show loader
        const loader = document.getElementById("auth-loader");
        loader.classList.add("active");

        // Simulate account creation
        setTimeout(() => {
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        }, 2000);
    });

    // Delete confirmation input validation
    const deleteConfirmationInput = document.getElementById("delete-confirmation")
    const confirmDeleteButton = document.getElementById("confirm-delete")

    if (deleteConfirmationInput && confirmDeleteButton) {
        deleteConfirmationInput.addEventListener("input", function () {
            if (this.value === "DELETE") {
                confirmDeleteButton.removeAttribute("disabled")
            } else {
                confirmDeleteButton.setAttribute("disabled", "disabled")
            }
        })
    }

    // Expertise selection limit (max 3)
    const expertiseCheckboxes = document.querySelectorAll('.expertise-option input[type="checkbox"]')

    expertiseCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const checkedBoxes = document.querySelectorAll('.expertise-option input[type="checkbox"]:checked')

            if (checkedBoxes.length > 3) {
                this.checked = false
                alert("You can select a maximum of 3 areas of expertise.")
            }
        })
    })
}

// Function to validate a form step
function validateStep(step) {
    const inputs = step.querySelectorAll("input[required], select[required], textarea[required]")
    let isValid = true

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false
            input.classList.add("invalid")
        } else {
            input.classList.remove("invalid")
        }
    })

    // Special validation for email
    const emailInput = step.querySelector('input[type="email"]')
    if (emailInput && emailInput.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailInput.value)) {
            isValid = false
            emailInput.classList.add("invalid")
        }
    }

    // Special validation for password match
    const passwordInput = step.querySelector("#signup-password")
    const confirmPasswordInput = step.querySelector("#signup-confirm-password")

    if (passwordInput && confirmPasswordInput && passwordInput.value && confirmPasswordInput.value) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false
            confirmPasswordInput.classList.add("invalid")
        }
    }

    return isValid
}

// Function to show validation error
function showValidationError() {
    // Create error message
    const errorMessage = document.createElement("div")
    errorMessage.className = "validation-error"
    errorMessage.textContent = "Please fill in all required fields correctly."
    errorMessage.style.color = "var(--danger)"
    errorMessage.style.fontSize = "0.875rem"
    errorMessage.style.marginTop = "0.5rem"
    errorMessage.style.textAlign = "center"

    // Add error message to the form
    const activeStep = document.querySelector(".signup-step.active")

    // Remove any existing error messages
    const existingError = activeStep.querySelector(".validation-error")
    if (existingError) {
        existingError.remove()
    }

    // Add the new error message
    activeStep.appendChild(errorMessage)

    // Highlight invalid fields
    const invalidInputs = activeStep.querySelectorAll(".invalid")
    invalidInputs.forEach((input) => {
        input.style.borderColor = "var(--danger)"

        input.addEventListener(
            "input",
            function () {
                this.style.borderColor = ""
                this.classList.remove("invalid")
            },
            { once: true },
        )
    })
}

