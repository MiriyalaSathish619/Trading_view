


//user name validation


document.addEventListener("DOMContentLoaded", function () {
    let usernameField = document.getElementById("username");
    let usernameError = document.createElement("div");
    usernameError.classList.add("error-message");
    usernameField.parentNode.appendChild(usernameError);

    function showError(message) {
        usernameError.innerText = message;
        usernameField.classList.add("invalid-input");

        // Shake effect
        usernameField.classList.add("shake");
        setTimeout(() => {
            usernameField.classList.remove("shake");
        }, 300);
    }

    function removeError() {
        usernameError.innerText = "";
        usernameField.classList.remove("invalid-input");
    }

    usernameField.addEventListener("input", function () {
        let usernameValue = this.value.trim();
        removeError(); // Reset errors

        if (usernameValue === "") return; // No error when empty

        if (/^[ .]|[ .]$/.test(usernameValue)) {
            showError("Username cannot start or end with space or dot.");
            return;
        }

        if (usernameValue === "." || usernameValue === " ") {
            showError("Username cannot be just a dot or space.");
            return;
        }

        if (/\. /.test(usernameValue) || / \./.test(usernameValue)) {
            showError("Dot and space cannot be used together.");
            return;
        }

        if (/ {2,}/.test(usernameValue) || /\.{2,}/.test(usernameValue)) {
            showError("Multiple consecutive spaces or dots are not allowed.");
            return;
        }

        if ((usernameValue.match(/\./g) || []).length > 1) {
            showError("Only one dot is allowed.");
            return;
        }

        if ((usernameValue.match(/ /g) || []).length > 1) {
            showError("Only one space is allowed.");
            return;
        }

        if (!/^[a-zA-Z .]+$/.test(usernameValue)) {
            showError("Only letters, a single space, or a single dot are allowed.");
            return;
        }

        removeError(); // If everything is valid, remove errors
    });

    document.querySelector("#signUpForm").addEventListener("submit", function (event) {
        let usernameValue = usernameField.value.trim();
        removeError();

        if (usernameValue.length < 5) {
            showError("Username should be at least 5 characters.");
            event.preventDefault();
            return;
        }

        if (usernameValue.length > 15) {
            showError("Maximum length reached (15 characters).");
            event.preventDefault();
            return;
        }

        if (/^[ .]|[ .]$/.test(usernameValue)) {
            showError("Username cannot start or end with space or dot.");
            event.preventDefault();
            return;
        }

        if (usernameValue.includes(".") && usernameValue.includes(" ")) {
            showError("Dot and space cannot be used together.");
            event.preventDefault();
            return;
        }

        if ((usernameValue.match(/\./g) || []).length > 1) {
            showError("Only one dot is allowed.");
            event.preventDefault();
            return;
        }

        if ((usernameValue.match(/ /g) || []).length > 1) {
            showError("Only one space is allowed.");
            event.preventDefault();
            return;
        }
    });
});




// signup email


document.addEventListener("DOMContentLoaded", function () {
    let emailField = document.getElementById("email");

    // Create error message dynamically
    let emailError = document.createElement("span");
    emailError.classList.add("error-message"); // Add a CSS class for styling
    emailField.parentNode.appendChild(emailError); // Insert after input field

    // Allowed domain extensions
    const allowedDomains = [
        "com", "org", "net", "edu", "gov", "info", "biz", "in", "us", "uk", "ca", "au", "de",
        "xyz", "tech", "online", "store", "ai", "io", "app", "123", "888", "777"
    ];

    function showError(message) {
        emailError.innerText = message;
        emailField.classList.add("invalid-input");

        // Add shake effect
        emailField.classList.add("shake");
        setTimeout(() => {
            emailField.classList.remove("shake");
        }, 300);
    }

    function removeError() {
        emailError.innerText = "";
        emailField.classList.remove("invalid-input");
    }

    function validateEmail() {
        let emailValue = emailField.value.trim();
        removeError(); // Reset error state

        if (emailValue === "") return; // Allow empty field (handled by `required`)

        // Ensure correct email format
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError("Invalid email format.");
            return;
        }

        // No spaces allowed
        if (/\s/.test(emailValue)) {
            showError("Email cannot contain spaces.");
            return;
        }

        // No consecutive dots
        if (/\.\./.test(emailValue)) {
            showError("Consecutive dots are not allowed.");
            return;
        }

        // Ensure email does not start with a number
        if (/^[0-9]/.test(emailValue)) {
            showError("Email cannot start with a number.");
            return;
        }

        // Validate domain extension
        let parts = emailValue.split("@");
        if (parts.length === 2) {
            let domainPart = parts[1].split(".");
            let tld = domainPart[domainPart.length - 1];

            if (!allowedDomains.includes(tld)) {
                showError(`Allowed domains: ${allowedDomains.join(", ")}`);
                return;
            }
        }
    }

    // Attach live validation
    emailField.addEventListener("input", validateEmail);
});



//signup phone

document.addEventListener("DOMContentLoaded", function () {
    let phoneField = document.getElementById("phone");

    // Create error message dynamically
    let phoneError = document.createElement("span");
    phoneError.classList.add("error-message"); // Add a CSS class for styling
    phoneField.parentNode.appendChild(phoneError); // Insert after input field

    function showError(message) {
        phoneError.innerText = message;
        phoneField.classList.add("error-border", "shake"); // Add red border & shake effect
        setTimeout(() => phoneField.classList.remove("shake"), 500); // Remove shake after 500ms
    }

    function clearError() {
        phoneError.innerText = "";
        phoneField.classList.remove("error-border"); // Remove red border
    }

    function validatePhoneNumber() {
        let phoneValue = phoneField.value.trim(); // Trim spaces at start & end
        phoneField.value = phoneValue; // Update input field with trimmed value
        clearError(); // Reset error message and border

        // If the field is empty, don't show any error
        if (phoneValue === "") return;

        // Check for non-digit characters
        if (/[^0-9]/.test(phoneValue)) {
            showError("Phone number must contain only digits.");
            return;
        }

        // Ensure first digit is between 6-9
        if (!/^[6-9]/.test(phoneValue)) {
            showError("Phone number must start with a digit between 6 and 9.");
            return;
        }

        // Count only digits
        const digitCount = phoneValue.length;

        // Show error if digit count exceeds 10
        if (digitCount > 10) {
            showError("Phone number cannot exceed 10 digits.");
            return;
        }

      
    }

    // Attach live validation
    phoneField.addEventListener("input", validatePhoneNumber);
});





//signup trading view id



document.addEventListener("DOMContentLoaded", function () {
    let tradingViewField = document.getElementById("tradingViewId");

    // Create error message dynamically
    let tradingViewError = document.createElement("span");
    tradingViewError.classList.add("error-message"); // Add a CSS class for styling
    tradingViewField.parentNode.appendChild(tradingViewError); // Insert after input field

    function showError(message) {
        tradingViewError.innerText = message;
        tradingViewField.classList.add("error-border", "shake"); // Add red border & shake effect
        setTimeout(() => tradingViewField.classList.remove("shake"), 500); // Remove shake after 500ms
    }

    function clearError() {
        tradingViewError.innerText = "";
        tradingViewField.classList.remove("error-border"); // Remove red border
    }

    function validateTradingViewId() {
        let tradingViewValue = tradingViewField.value.trim();
        tradingViewField.value = tradingViewValue; // Trim spaces at start & end
        clearError(); // Reset error message and border

        if (tradingViewValue === "") return; // Allow empty field (handled by `required`)

        // Ensure only letters, numbers, and underscores, and must start with a letter
        if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(tradingViewValue)) {
            showError("ID must start with a letter and contain only letters, numbers, and underscores.");
            return;
        }

        // Validate length (between 5 and 20 characters)
        if (tradingViewValue.length < 5) {
            showError("TradingView ID must be at least 5 characters.");
            return;
        }
        if (tradingViewValue.length > 20) {
            showError("TradingView ID cannot exceed 20 characters.");
            return;
        }
    }

    // Attach live validation
    tradingViewField.addEventListener("input", validateTradingViewId);
});


//signup password

document.addEventListener("DOMContentLoaded", function () {
    const validationMessages = {
        length: "8-32 characters",
        uppercase: "1 uppercase",
        lowercase: "1 lowercase",
        number: "1 number",
        special: "1 special character",
        space: "no spaces",
        repeat: "no 3 repeating characters",
        sequence: "no sequential characters",
        match: "Passwords do not match",
    };

    function setupSignupValidation() {
        let passwordField = document.getElementById("password");
        let confirmPasswordField = document.getElementById("repeatPassword");
        let passwordContainer = passwordField.parentNode; // Assuming the eye icon is inside this container
        let eyeIcon = passwordContainer.querySelector(".eye-icon"); // Select the eye icon

        // Create error message container for password
        let passwordErrorContainer = document.createElement("div");
        passwordErrorContainer.classList.add("error-container");
        passwordContainer.appendChild(passwordErrorContainer);

        let confirmPasswordError = document.createElement("span");
        confirmPasswordError.classList.add("error-message");
        confirmPasswordField.parentNode.appendChild(confirmPasswordError);

        function validatePassword() {
            passwordField.value = passwordField.value.trim(); // Trim spaces on input
            let passwordValue = passwordField.value;
            passwordErrorContainer.innerHTML = ""; // Reset error messages
            removeErrorStyles(passwordField);

            if (passwordValue === "") {
                resetEyeIconPosition();
                return;
            } 

            let validations = {
                length: passwordValue.length >= 8 && passwordValue.length <= 32,
                uppercase: /[A-Z]/.test(passwordValue),
                lowercase: /[a-z]/.test(passwordValue),
                number: /[0-9]/.test(passwordValue),
                special: /[!@#$%^&*()_+{}[\]:;<>,.?/~]/.test(passwordValue),
                space: !/\s/.test(passwordValue), // No spaces allowed
                repeat: !/(.)\1\1/.test(passwordValue),
                sequence: !/(1234|abcd|qwerty|asdf|1111|aaaa)/.test(passwordValue.toLowerCase()),
            };

            let failedConditions = Object.keys(validations)
                .filter(key => !validations[key])
                .map(key => validationMessages[key]);

            if (failedConditions.length > 0) {
                let errorMsg = document.createElement("p");
                errorMsg.classList.add("error-message");
                errorMsg.innerText = failedConditions.join(", "); // Show all failed conditions in a single message
                passwordErrorContainer.appendChild(errorMsg);

                showErrorStyles(passwordField);
                adjustEyeIconPosition();
            } else {
                removeErrorStyles(passwordField);
                resetEyeIconPosition();
            }

            validateConfirmPassword(); // Check confirm password after password validation
        }

        function validateConfirmPassword() {
            let passwordValue = passwordField.value;
            let confirmPasswordValue = confirmPasswordField.value.trim();
            confirmPasswordError.innerText = ""; // Reset error message
            removeErrorStyles(confirmPasswordField);

            if (confirmPasswordValue === "") {
                resetEyeIconPosition();
                return;
            }

            if (confirmPasswordValue !== passwordValue) {
                confirmPasswordError.innerText = validationMessages.match;
                showErrorStyles(confirmPasswordField);
                adjustEyeIconPosition();
            } else {
                removeErrorStyles(confirmPasswordField);
                resetEyeIconPosition();
            }
        }

        function showErrorStyles(input) {
            input.classList.add("invalid-input");
            input.classList.add("shake");
            setTimeout(() => input.classList.remove("shake"), 300);
        }

        function removeErrorStyles(input) {
            input.classList.remove("invalid-input");
        }

        // Adjust eye icon when error appears
        function adjustEyeIconPosition() {
            if (eyeIcon) {
                eyeIcon.style.top = "60%"; // Move the icon down when error appears
            }
        }

        // Reset eye icon position when error is removed
        function resetEyeIconPosition() {
            if (eyeIcon) {
                eyeIcon.style.top = "40%"; // Restore default position
            }
        }

        // Attach event listeners
        passwordField.addEventListener("input", validatePassword);
        confirmPasswordField.addEventListener("input", validateConfirmPassword);
    }

    setupSignupValidation();
});








// signin validation

const identifierInput = document.getElementById('signin-identifier');

identifierInput.addEventListener('input', function () {
    validateIdentifier();
});

function validateIdentifier() {
    const identifierValue = identifierInput.value.trim();
    removeError(identifierInput); // Clear previous errors

    const firstChar = identifierValue.charAt(0);

    // Rule 1: Fail if it starts with a number (0-4) OR any special character
    if (/^[0-5!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]/.test(firstChar)) {
        showError(identifierInput);
        return;
    }

    // Rule 2: Fail if it contains any spaces
    if (/\s/.test(identifierValue)) {
        showError(identifierInput);
        return;
    }

    // Rule 3: Fail if digit count exceeds 10
    const digitCount = (identifierValue.match(/\d/g) || []).length;
    if (digitCount > 10) {
        showError(identifierInput);
        return;
    }

    // Special Character Rules:
    if (/^[5-9]/.test(firstChar)) {
        // If first character is a number (≥5), do not allow any special characters
        if (/[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]/.test(identifierValue)) {
            showError(identifierInput);
            return;
        }
    } else {
        // If first character is a letter, allow up to 2 special characters (must be different)
        const specialChars = identifierValue.match(/[!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]/g) || [];
        
        // Rule: Fail if more than 2 special characters
        if (specialChars.length > 2) {
            showError(identifierInput);
            return;
        }

        // Rule: Fail if any special character is repeated
        const specialCharCount = {};
        for (let char of specialChars) {
            specialCharCount[char] = (specialCharCount[char] || 0) + 1;
            if (specialCharCount[char] > 1) {
                showError(identifierInput);
                return;
            }
        }
    }
}

function showError(input) {
    removeError(input); // Remove existing error before adding a new one

    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.textContent = "Invalid format"; // Generic error message

    input.classList.add('invalid-input'); // Keep red border until corrected
    input.parentNode.appendChild(errorDiv); // Append error below input

    // Shake effect
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 300);
}

function removeError(input) {
    input.classList.remove('invalid-input');
    let errorDiv = input.parentNode.querySelector(".error-message");
    if (errorDiv) {
        errorDiv.remove();
    }
}



const signInForm = document.getElementById("signInForm");
const passwordInput = document.getElementById("signin-password");

signInForm.addEventListener("submit", function (event) {
    let isValid = true;
    
    // Remove previous errors
    removeError(passwordInput);

    // Check if password is empty or contains spaces
    if (passwordInput.value.trim() === "" || /\s/.test(passwordInput.value)) {
        showError(passwordInput);
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if invalid
    }
});

// ✅ Remove error when user starts typing or focuses on input
passwordInput.addEventListener("input", function () {
    removeError(passwordInput);
});

passwordInput.addEventListener("focus", function () {
    removeError(passwordInput);
});

function showError(input) {
    removeError(input); // Remove existing error before adding a new one

    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.textContent = "Cannot be Empty"; // Generic error message

    input.classList.add('invalid-input'); // Keep red border until corrected
    input.parentNode.appendChild(errorDiv); // Append error below input

    // Move the eye icon slightly up
    let eyeIcon = input.parentNode.querySelector(".toggle-password");
    if (eyeIcon) {
        eyeIcon.style.top = "30%"; // Adjust based on error height
    }

    // Shake effect
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 300);
}

function removeError(input) {
    input.classList.remove('invalid-input');
    let errorDiv = input.parentNode.querySelector(".error-message");
    if (errorDiv) {
        errorDiv.remove();
    }

    // Reset the eye icon position
    let eyeIcon = input.parentNode.querySelector(".toggle-password");
    if (eyeIcon) {
        eyeIcon.style.top = "40%"; // Reset back to default position
    }
}




// Forgot Password Validation Script
document.addEventListener("DOMContentLoaded", function () {
    let forgotIdentifierField = document.getElementById("forgot-identifier");

    // Check if error span already exists to prevent duplicates
    let forgotIdentifierError = forgotIdentifierField.parentNode.querySelector(".error-message");
    if (!forgotIdentifierError) {
        forgotIdentifierError = document.createElement("span");
        forgotIdentifierError.classList.add("error-message");
        forgotIdentifierField.parentNode.appendChild(forgotIdentifierError);
    }

    function validateForgotIdentifier(showEmptyError = false) {
        let value = forgotIdentifierField.value.trim();
        forgotIdentifierError.innerText = ""; // Reset error message

        if (value === "" && showEmptyError) {
            forgotIdentifierError.innerText = "This field is required.";
            return false;
        }

        // Validation regex
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phoneRegex = /^\+?\d{10,15}$/; // Supports optional + and 10-15 digits
        let tradingViewIdRegex = /^[a-zA-Z0-9_]{5,15}$/; // Letters, numbers, underscore (5-15 chars)

        if (value !== "" && !(emailRegex.test(value) || phoneRegex.test(value) || tradingViewIdRegex.test(value))) {
            forgotIdentifierError.innerText = "Enter a valid Email, Phone Number, or TradingView ID.";
            return false;
        }

        return true;
    }

    // Attach real-time validation
    forgotIdentifierField.addEventListener("input", () => validateForgotIdentifier(false));

    // Expose validation function globally
    window.validateForgotIdentifier = validateForgotIdentifier;
});


//reset validation
document.addEventListener("DOMContentLoaded", function () {
    const validationMessages = {
        length: "8-32 characters",
        uppercase: "1 uppercase",
        lowercase: "1 lowercase",
        number: "1 number",
        special: "1 special character",
        space: "no spaces",
        repeat: "no 3 repeating characters",
        sequence: "no sequential characters",
        match: "Passwords do not match",
    };

    function setupResetPasswordValidation() {
        let passwordField = document.getElementById("new-password");
        let confirmPasswordField = document.getElementById("confirm-password");
        let passwordContainer = passwordField.parentNode;
        let eyeIcon = passwordContainer.querySelector(".eye-icon");

        // Create error message container for password
        let passwordErrorContainer = document.createElement("div");
        passwordErrorContainer.classList.add("error-container");
        passwordContainer.appendChild(passwordErrorContainer);

        let confirmPasswordError = document.createElement("span");
        confirmPasswordError.classList.add("error-message");
        confirmPasswordField.parentNode.appendChild(confirmPasswordError);

        function validatePassword() {
            passwordField.value = passwordField.value.trim();
            let passwordValue = passwordField.value;
            passwordErrorContainer.innerHTML = "";
            removeErrorStyles(passwordField);

            if (passwordValue === "") {
                resetEyeIconPosition();
                return;
            }

            let validations = {
                length: passwordValue.length >= 8 && passwordValue.length <= 32,
                uppercase: /[A-Z]/.test(passwordValue),
                lowercase: /[a-z]/.test(passwordValue),
                number: /[0-9]/.test(passwordValue),
                special: /[!@#$%^&*()_+{}[\]:;<>,.?/~]/.test(passwordValue),
                space: !/\s/.test(passwordValue),
                repeat: !/(.)\1\1/.test(passwordValue),
                sequence: !/(1234|abcd|qwerty|asdf|1111|aaaa)/.test(passwordValue.toLowerCase()),
            };

            let failedConditions = Object.keys(validations)
                .filter(key => !validations[key])
                .map(key => validationMessages[key]);

            if (failedConditions.length > 0) {
                let errorMsg = document.createElement("p");
                errorMsg.classList.add("error-message");
                errorMsg.innerText = failedConditions.join(", ");
                passwordErrorContainer.appendChild(errorMsg);
                
                showErrorStyles(passwordField);
                adjustEyeIconPosition();
            } else {
                removeErrorStyles(passwordField);
                resetEyeIconPosition();
            }

            validateConfirmPassword();
        }

        function validateConfirmPassword() {
            let passwordValue = passwordField.value;
            let confirmPasswordValue = confirmPasswordField.value.trim();
            confirmPasswordError.innerText = "";
            removeErrorStyles(confirmPasswordField);

            if (confirmPasswordValue === "") {
                resetEyeIconPosition();
                return;
            }

            if (confirmPasswordValue !== passwordValue) {
                confirmPasswordError.innerText = validationMessages.match;
                showErrorStyles(confirmPasswordField);
                adjustEyeIconPosition();
            } else {
                removeErrorStyles(confirmPasswordField);
                resetEyeIconPosition();
            }
        }

        function showErrorStyles(input) {
            input.classList.add("invalid-input");
            input.classList.add("shake");
            setTimeout(() => input.classList.remove("shake"), 300);
        }

        function removeErrorStyles(input) {
            input.classList.remove("invalid-input");
        }

        function adjustEyeIconPosition() {
            if (eyeIcon) {
                eyeIcon.style.top = "60%";
            }
        }

        function resetEyeIconPosition() {
            if (eyeIcon) {
                eyeIcon.style.top = "40%";
            }
        }

        passwordField.addEventListener("input", validatePassword);
        confirmPasswordField.addEventListener("input", validateConfirmPassword);
    }

    setupResetPasswordValidation();
});

