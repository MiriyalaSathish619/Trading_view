document.addEventListener("DOMContentLoaded", function () {
    // Form and input elements
    const form = document.getElementById("demo-signup-form");
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const tradingViewField = document.getElementById("trading-view-id");
    const createPasswordField = document.getElementById("create-password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const referralField = document.getElementById("referral-id");

    // General message display
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("form-message");
    form.prepend(messageContainer);

    // Utility functions for error handling
    function showError(field, message) {
        if (!field) return;
        const errorSpan = field.parentNode.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.innerText = message;
            field.classList.add("invalid-input", "shake");
            setTimeout(() => field.classList.remove("shake"), 300);
        }
    }

    function clearErrors() {
        const fields = [usernameField, emailField, phoneField, tradingViewField, createPasswordField, confirmPasswordField];
        fields.forEach(field => {
            if (field) {
                const errorSpan = field.parentNode.querySelector(".error-message");
                if (errorSpan) {
                    errorSpan.innerText = "";
                    field.classList.remove("invalid-input");
                }
            }
        });
        messageContainer.innerText = "";
    }

    function showFormMessage(message, isError = false) {
        messageContainer.innerText = message;
        messageContainer.classList.toggle("error", isError);
        messageContainer.classList.toggle("success", !isError);
        setTimeout(() => {
            messageContainer.innerText = "";
            messageContainer.classList.remove("error", "success");
        }, 5000);
    }

    // Map server errors to fields
    function mapServerError(error) {
        const lowerError = error.toLowerCase();
        if (lowerError.includes("username")) {
            showError(usernameField, error);
        } else if (lowerError.includes("email")) {
            showError(emailField, error);
        } else if (lowerError.includes("phone")) {
            showError(phoneField, error);
        } else if (lowerError.includes("tradingview") || lowerError.includes("trading_view_id")) {
            showError(tradingViewField, error);
        } else if (lowerError.includes("password")) {
            showError(createPasswordField, error);
        } else {
            showFormMessage(error, true);
        }
    }

    // Form submission with API call
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Clear previous errors
            clearErrors();

            // Prepare form data (exclude confirm_password)
            const formData = {
                username: usernameField.value.trim(),
                email: emailField.value.trim(),
                phone: phoneField.value.trim(),
                trading_view_id: tradingViewField.value.trim(),
                password: createPasswordField.value.trim(),
                referral_id: referralField.value.trim() || null
            };

            try {
                const response = await fetch('http://localhost:5100/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    showFormMessage(`Account created successfully! Your user ID: ${result.user_id}`, false);
                    form.reset();
                    // Optional redirect (uncomment to enable)
                    // setTimeout(() => window.location.href = 'dashboard.html', 3000);
                } else {
                    mapServerError(result.error);
                }
            } catch (error) {
                console.error('API Error:', error);
                showFormMessage("Server error. Please try again later.", true);
            }
        });
    }
});