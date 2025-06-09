document.addEventListener("DOMContentLoaded", function () {
    // Form and input elements
    const form = document.getElementById("contactForm");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email-connect");
    const messageField = document.getElementById("message");

    // Check if all fields exist
    const fields = [
        { field: nameField, name: "name", errorId: "nameError" },
        { field: emailField, name: "email-connect", errorId: "emailError-connect" },
        { field: messageField, name: "message", errorId: "messageError" }
    ];

    // Utility functions for error handling
    function showError(field, message, errorId) {
        if (!field) return;
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.innerText = message;
            field.classList.add("invalid-input", "shake");
            setTimeout(() => field.classList.remove("shake"), 300);
        }
    }

    function clearError(field, errorId) {
        if (!field) return;
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.innerText = "";
            field.classList.remove("invalid-input");
        }
    }

    // Name validation (same rules as username)
    function validateName() {
        if (!nameField) return false;
        const nameValue = nameField.value.trim();
        clearError(nameField, "nameError");

        if (nameValue === "") return false;

        if (/^[ .]|[ .]$/.test(nameValue)) {
            showError(nameField, "Name cannot start or end with space or dot.", "nameError");
            return false;
        }

        if (nameValue === "." || nameValue === " ") {
            showError(nameField, "Name cannot be just a dot or space.", "nameError");
            return false;
        }

        if (/\. /.test(nameValue) || / \./.test(nameValue)) {
            showError(nameField, "Dot and space cannot be used together.", "nameError");
            return false;
        }

        if (/ {2,}/.test(nameValue) || /\.{2,}/.test(nameValue)) {
            showError(nameField, "Multiple consecutive spaces or dots are not allowed.", "nameError");
            return false;
        }

        if ((nameValue.match(/\./g) || []).length > 1) {
            showError(nameField, "Only one dot is allowed.", "nameError");
            return false;
        }

        if ((nameValue.match(/ /g) || []).length > 1) {
            showError(nameField, "Only one space is allowed.", "nameError");
            return false;
        }

        if (!/^[a-zA-Z .]+$/.test(nameValue)) {
            showError(nameField, "Only letters, a single space, or a single dot are allowed.", "nameError");
            return false;
        }

        if (nameValue.length < 5) {
            showError(nameField, "Name should be at least 5 characters.", "nameError");
            return false;
        }

        if (nameValue.length > 15) {
            showError(nameField, "Maximum length reached (15 characters).", "nameError");
            return false;
        }

        return true;
    }

    // Email validation
    const allowedDomains = [
        "com", "org", "net", "edu", "gov", "info", "biz", "in", "us", "uk", "ca", "au", "de",
        "xyz", "tech", "online", "store", "ai", "io", "app", "123", "888", "777"
    ];

    function validateEmail() {
        if (!emailField) return false;
        const emailValue = emailField.value.trim();
        clearError(emailField, "emailError");

        if (emailValue === "") return false;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailField, "Invalid email format.", "emailError");
            return false;
        }

        if (/\s/.test(emailValue)) {
            showError(emailField, "Email cannot contain spaces.", "emailError");
            return false;
        }

        if (/\.\./.test(emailValue)) {
            showError(emailField, "Consecutive dots are not allowed.", "emailError");
            return false;
        }

        if (/^[0-9]/.test(emailValue)) {
            showError(emailField, "Email cannot start with a number.", "emailError");
            return false;
        }

        const parts = emailValue.split("@");
        if (parts.length === 2) {
            const domainPart = parts[1].split(".");
            const tld = domainPart[domainPart.length - 1];
            if (!allowedDomains.includes(tld)) {
                showError(emailField, `Allowed domains: ${allowedDomains.join(", ")}`, "emailError");
                return false;
            }
        }

        return true;
    }

    // Message validation
    function validateMessage() {
        if (!messageField) return false;
        const messageValue = messageField.value.trim();
        clearError(messageField, "messageError");

        if (messageValue === "") return false;

        if (messageValue.length < 10) {
            showError(messageField, "Message must be at least 10 characters.", "messageError");
            return false;
        }

        if (messageValue.length > 500) {
            showError(messageField, "Message cannot exceed 500 characters.", "messageError");
            return false;
        }

        if (!/^[a-zA-Z0-9 .,!?'\-()]+$/.test(messageValue)) {
            showError(messageField, "Message can only contain letters, numbers, spaces, and common punctuation (.,!?'-()).", "messageError");
            return false;
        }

        if (/ {2,}/.test(messageValue)) {
            showError(messageField, "Multiple consecutive spaces are not allowed.", "messageError");
            return false;
        }

        return true;
    }

    // Attach real-time validation
    
    if (nameField) nameField.addEventListener("input", validateName);
    if (emailField) emailField.addEventListener("input", validateEmail);
    if (messageField) messageField.addEventListener("input", validateMessage);

    // Form submission validation
    if (form) {
        form.addEventListener("submit", function (event) {
            let isValid = true;
        
            if (!validateName()) isValid = false;
            if (!validateEmail()) isValid = false;
            if (!validateMessage()) isValid = false;
        
            if (!isValid) {
                event.preventDefault();
                return;
            }
        
            event.preventDefault(); // prevent default submission since we're using fetch
        
            // Prepare data
            const formData = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                message: messageField.value.trim()
            };
        
            // Optional: Disable the button to prevent multiple submissions
            const submitBtn = form.querySelector(".submit-btn");
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
        
            // Send data to backend
            fetch("http://localhost:5200/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Enable button again
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
        
                if (data.success) {
                    alert("✅ Your message has been sent successfully!");
                    form.reset();
                    // Optionally clear errors
                    fields.forEach(f => clearError(f.field, f.errorId));
                } else {
                    alert("⚠️ " + data.message);
                }
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
                alert("❌ There was a problem sending your message. Please try again later.");
            });
        });
        
    }
});