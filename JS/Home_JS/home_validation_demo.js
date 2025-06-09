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

    // Check if all fields exist
    const fields = [
        { field: usernameField, name: "username" },
        { field: emailField, name: "email" },
        { field: phoneField, name: "phone" },
        { field: tradingViewField, name: "trading-view-id" },
        { field: createPasswordField, name: "create-password" },
        { field: confirmPasswordField, name: "confirm-password" }
    ];

    // Create error spans for each field
    function createErrorSpan() {
        const span = document.createElement("span");
        span.classList.add("error-message");
        return span;
    }

    // Add error spans below each input
    fields.forEach(({ field, name }) => {
        if (!field) {
            console.error(`Field with ID "${name}" not found in the DOM.`);
            return;
        }
        const errorSpan = createErrorSpan();
        field.parentNode.appendChild(errorSpan);
        console.log(`Created error span for ${name}`);
    });

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

    function clearError(field) {
        if (!field) return;
        const errorSpan = field.parentNode.querySelector(".error-message");
        if (errorSpan) {
            errorSpan.innerText = "";
            field.classList.remove("invalid-input");
        }
    }

    // Username validation
    function validateUsername() {
        if (!usernameField) return false;
        const usernameValue = usernameField.value.trim();
        clearError(usernameField);

        if (usernameValue === "") return false;

        if (/^[ .]|[ .]$/.test(usernameValue)) {
            showError(usernameField, "Username cannot start or end with space or dot.");
            return false;
        }

        if (usernameValue === "." || usernameValue === " ") {
            showError(usernameField, "Username cannot be just a dot or space.");
            return false;
        }

        if (/\. /.test(usernameValue) || / \./.test(usernameValue)) {
            showError(usernameField, "Dot and space cannot be used together.");
            return false;
        }

        if (/ {2,}/.test(usernameValue) || /\.{2,}/.test(usernameValue)) {
            showError(usernameField, "Multiple consecutive spaces or dots are not allowed.");
            return false;
        }

        if ((usernameValue.match(/\./g) || []).length > 1) {
            showError(usernameField, "Only one dot is allowed.");
            return false;
        }

        if ((usernameValue.match(/ /g) || []).length > 1) {
            showError(usernameField, "Only one space is allowed.");
            return false;
        }

        if (!/^[a-zA-Z .]+$/.test(usernameValue)) {
            showError(usernameField, "Only letters, a single space, or a single dot are allowed.");
            return false;
        }

        if (usernameValue.length < 5) {
            showError(usernameField, "Username should be at least 5 characters.");
            return false;
        }

        if (usernameValue.length > 15) {
            showError(usernameField, "Maximum length reached (15 characters).");
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
        clearError(emailField);

        if (emailValue === "") return false;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError(emailField, "Invalid email format.");
            return false;
        }

        if (/\s/.test(emailValue)) {
            showError(emailField, "Email cannot contain spaces.");
            return false;
        }

        if (/\.\./.test(emailValue)) {
            showError(emailField, "Consecutive dots are not allowed.");
            return false;
        }

        if (/^[0-9]/.test(emailValue)) {
            showError(emailField, "Email cannot start with a number.");
            return false;
        }

        const parts = emailValue.split("@");
        if (parts.length === 2) {
            const domainPart = parts[1].split(".");
            const tld = domainPart[domainPart.length - 1];
            if (!allowedDomains.includes(tld)) {
                showError(emailField, `Allowed domains: ${allowedDomains.join(", ")}`);
                return false;
            }
        }

        return true;
    }

    // Phone validation
    function validatePhone() {
        if (!phoneField) return false;
        const phoneValue = phoneField.value.trim();
        phoneField.value = phoneValue;
        clearError(phoneField);

        if (phoneValue === "") return false;

        if (/[^0-9]/.test(phoneValue)) {
            showError(phoneField, "Phone number must contain only digits.");
            return false;
        }

        if (!/^[6-9]/.test(phoneValue)) {
            showError(phoneField, "Phone number must start with a digit between 6 and 9.");
            return false;
        }

        if (phoneValue.length !== 10) {
            showError(phoneField, "Phone number must be exactly 10 digits.");
            return false;
        }

        return true;
    }

    // TradingView ID validation
    function validateTradingViewId() {
        if (!tradingViewField) return false;
        const tradingViewValue = tradingViewField.value.trim();
        tradingViewField.value = tradingViewValue;
        clearError(tradingViewField);

        if (tradingViewValue === "") return true; // Optional field

        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(tradingViewValue)) {
            showError(tradingViewField, "ID must start with a letter and contain only letters, numbers, and underscores.");
            return false;
        }

        if (tradingViewValue.length < 5) {
            showError(tradingViewField, "TradingView ID must be at least 5 characters.");
            return false;
        }

        if (tradingViewValue.length > 20) {
            showError(tradingViewField, "TradingView ID cannot exceed 20 characters.");
            return false;
        }

        return true;
    }

    // Password validation
    const validationMessages = {
        length: "8-32 characters",
        uppercase: "1 uppercase",
        lowercase: "1 lowercase",
        number: "1 number",
        special: "1 special character",
        space: "no spaces",
        repeat: "no 3 repeating characters",
        sequence: "no sequential characters",
        match: "Passwords do not match"
    };

    function validateCreatePassword() {
        if (!createPasswordField) return false;
        const passwordValue = createPasswordField.value.trim();
        createPasswordField.value = passwordValue;
        clearError(createPasswordField);

        if (passwordValue === "") return false;

        const validations = {
            length: passwordValue.length >= 8 && passwordValue.length <= 32,
            uppercase: /[A-Z]/.test(passwordValue),
            lowercase: /[a-z]/.test(passwordValue),
            number: /[0-9]/.test(passwordValue),
            special: /[!@#$%^&*()_+{}[\]:;<>,.?/~]/.test(passwordValue),
            space: !/\s/.test(passwordValue),
            repeat: !/(.)\1\1/.test(passwordValue),
            sequence: !/(1234|abcd|qwerty|asdf|1111|aaaa)/.test(passwordValue.toLowerCase())
        };

        const failedConditions = Object.keys(validations)
            .filter(key => !validations[key])
            .map(key => validationMessages[key]);

        if (failedConditions.length > 0) {
            showError(createPasswordField, failedConditions.join(", "));
            return false;
        }

        return true;
    }

    function validateConfirmPassword() {
        if (!confirmPasswordField) return false;
        const createPasswordValue = createPasswordField.value.trim();
        const confirmPasswordValue = confirmPasswordField.value.trim();
        confirmPasswordField.value = confirmPasswordValue;
        clearError(confirmPasswordField);

        if (confirmPasswordValue === "") return false;

        if (confirmPasswordValue !== createPasswordValue) {
            showError(confirmPasswordField, validationMessages.match);
            return false;
        }

        return true;
    }

    // Referral ID validation (optional, no validation)
    function validateReferralId() {
        return true; // Optional field, always valid
    }

    // Attach real-time validation
    if (usernameField) usernameField.addEventListener("input", validateUsername);
    if (emailField) emailField.addEventListener("input", validateEmail);
    if (phoneField) phoneField.addEventListener("input", validatePhone);
    if (tradingViewField) tradingViewField.addEventListener("input", validateTradingViewId);
    if (createPasswordField) {
        createPasswordField.addEventListener("input", () => {
            validateCreatePassword();
            validateConfirmPassword(); // Re-validate confirm password when create password changes
        });
    }
    if (confirmPasswordField) confirmPasswordField.addEventListener("input", validateConfirmPassword);

    // Form submission validation
    if (form) {
        form.addEventListener("submit", function (event) {
            let isValid = true;

            if (!validateUsername()) isValid = false;
            if (!validateEmail()) isValid = false;
            if (!validatePhone()) isValid = false;
            if (!validateTradingViewId()) isValid = false;
            if (!validateCreatePassword()) isValid = false;
            if (!validateConfirmPassword()) isValid = false;
            if (!validateReferralId()) isValid = false;

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

});