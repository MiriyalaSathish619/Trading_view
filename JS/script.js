

document.addEventListener("DOMContentLoaded", function () {
    const toggleSignIn = document.getElementById("signInBtn");
    const toggleSignUp = document.getElementById("signUpBtn");
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const underline = document.querySelector(".underline");

    // Debugging logs
    console.log(toggleSignIn, toggleSignUp, signInForm, signUpForm, underline);

    if (!toggleSignIn || !toggleSignUp || !signInForm || !signUpForm || !underline) {
        console.error("One or more elements not found! Check your IDs.");
        return;
    }

    toggleSignIn.addEventListener("click", function () {
        console.log("Sign In button clicked");
        signInForm.classList.remove("hidden");
        signUpForm.classList.add("hidden");
        toggleSignIn.classList.add("active");
        toggleSignUp.classList.remove("active");
        underline.style.transform = "translateX(0%)";
    });

    toggleSignUp.addEventListener("click", function () {
        console.log("Sign Up button clicked");
        signUpForm.classList.remove("hidden");
        signInForm.classList.add("hidden");
        toggleSignUp.classList.add("active");
        toggleSignIn.classList.remove("active");
        underline.style.transform = "translateX(100%)";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const forms = {
        signIn: document.getElementById("signInForm"),
        signUp: document.getElementById("signUpForm"),
        forgotPassword: document.getElementById("forgotPasswordForm"),
        resetPassword: document.getElementById("resetPasswordForm")
    };

    const buttons = {
        signIn: document.getElementById("signInBtn"),
        signUp: document.getElementById("signUpBtn"),
        forgotPassword: document.getElementById("forgotPasswordLink"),
        forgotSubmit: document.getElementById("forgotSubmitBtn"),
        resetSubmit:document.getElementById("resetSubmitBtn"),
        backToSignIn: document.querySelectorAll("#backToSignIn1, #backToSignIn2")
    };

    const toggleButtons = document.getElementById("toggleButtons");
    const leftImage = document.getElementById("leftImage");
    const headerTitle = document.querySelector(".auth-header h2");
    const headerDesc = document.querySelector(".auth-header p");

    // Image sources & header text for each form
    const formData = {
        signIn: {
            img: "../images/login-vector.jpg",
           
            showToggle: true
        },
        signUp: {
            img: "../images/signup-vector.jpg",
           
            
            showToggle: true
        },
        forgotPassword: {
            img: "../images/forgot-vector.jpg",
            
           
            showToggle: false
        },
        resetPassword: {
            img: "../images/reset-vector.jpg",
           
            
            showToggle: false
        }
    };

    // Function to show a form and update the image & header
    function showForm(formKey) {
        // Hide all forms
        Object.values(forms).forEach(form => form.classList.add("hidden"));
        forms[formKey].classList.remove("hidden");

        // Update image, header, and toggle button visibility
        leftImage.src = formData[formKey].img;
        headerTitle.textContent = formData[formKey].title;
        headerDesc.textContent = formData[formKey].desc;
        toggleButtons.classList.toggle("hidden", !formData[formKey].showToggle);
           // Reset animation for <p> tag
    headerDesc.style.animation = "none";
    setTimeout(() => {
        headerDesc.style.animation = "slideIn 1s ease-out forwards";
    }, 10);
    }

    // Event Listeners for form toggles
    buttons.signIn.addEventListener("click", () => showForm("signIn"));
    buttons.signUp.addEventListener("click", () => showForm("signUp"));
    buttons.forgotPassword.addEventListener("click", (e) => {
        e.preventDefault();
        showForm("forgotPassword");
    });
    let resetIdentifier = ""; // ✅ Global variable to store identifier

    buttons.forgotSubmit.addEventListener("click", async (e) => {
        e.preventDefault();
    
        let identifier = document.getElementById("forgot-identifier").value.trim();
        if (!validateForgotIdentifier(true)) {
            return; // ❌ Stop if validation fails
        }
    
        try {
            let response = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier }),
            });
    
            let data = await response.json();
            console.log("Forgot Password Response:", data);
    
            if (!response.ok) {
                alert(data.error || "Something went wrong!");
                return;
            }
    
            alert(data.message); // ✅ Show success message
            resetIdentifier = identifier; // ✅ Store identifier in a global variable
    
            // 🔥 Move to Reset Password form
            showForm("resetPassword");
    
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Network error, please try again.");
        }
    });
    

    buttons.resetSubmit.addEventListener("click", async (e) => {
        e.preventDefault();
    
        let newPassword = document.getElementById("new-password").value.trim();
        let confirmPassword = document.getElementById("confirm-password").value.trim();
    
        if (!resetIdentifier) {
            alert("Session expired! Please request password reset again.");
            showForm("forgotPassword");
            return;
        }
    
        if (!newPassword || !confirmPassword) {
            alert("Please enter and confirm your new password.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match. Try again.");
            return;
        }
    
        try {
            let response = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: resetIdentifier, new_password: newPassword }),
            });
    
            let data = await response.json();
            console.log("Reset Password Response:", data);
    
            if (!response.ok) {
                alert(data.error || "Something went wrong!");
                return;
            }
    
            alert("Password reset successful! Redirecting to Sign In...");
            resetIdentifier = ""; // ✅ Clear stored identifier
            showForm("signIn");
    
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Network error, please try again.");
        }
    });
    
    
    
    buttons.backToSignIn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Check which button was clicked
            if (e.target.id === "backToSignIn1") {
                showForm("signIn");  // Forgot Password → Sign In
            } else if (e.target.id === "backToSignIn2") {
                showForm("forgotPassword");  // Reset Password → Forgot Password
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-password").forEach(icon => {
        icon.addEventListener("click", function () {
            const targetInput = document.getElementById(this.dataset.target);
            if (!targetInput) return;

            // Toggle password visibility
            if (targetInput.type === "password") {
                targetInput.type = "text";
                this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

                // Set a timer to switch back to password mode if the mouse leaves the field
                let hideTimeout = setTimeout(() => {
                    if (document.activeElement !== targetInput) {
                        targetInput.type = "password";
                        this.innerHTML = '<i class="fa-solid fa-eye"></i>';
                    }
                }, 3000);

                // Clear timer when user focuses back on input
                targetInput.addEventListener("focus", () => clearTimeout(hideTimeout), { once: true });

                // Reset to password if mouse leaves the input field
                targetInput.addEventListener("mouseleave", function () {
                    clearTimeout(hideTimeout);
                    setTimeout(() => {
                        if (document.activeElement !== targetInput) {
                            targetInput.type = "password";
                            icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
                        }
                    }, 3000);
                }, { once: true });

            } else {
                targetInput.type = "password";
                this.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const authBanner = document.getElementById("authBanner");

    const signInBtn = document.getElementById("signInBtn");
    const signUpBtn = document.getElementById("signUpBtn");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const forgotSubmitBtn = document.getElementById("forgotSubmitBtn");
    const backToSignIn1 = document.getElementById("backToSignIn1");
    const backToSignIn2 = document.getElementById("backToSignIn2");

    function updateBanner(text) {
        authBanner.textContent = text;
    }

    // Event listeners for navigation
    signInBtn.addEventListener("click", () => updateBanner("SIGN IN"));
    signUpBtn.addEventListener("click", () => updateBanner("SIGN UP"));
    forgotPasswordLink.addEventListener("click", () => updateBanner("FORGOT PASSWORD"));
    forgotSubmitBtn.addEventListener("click", () => updateBanner("RESET PASSWORD"));
    backToSignIn1.addEventListener("click", () => updateBanner("SIGN IN"));
    backToSignIn2.addEventListener("click", () => updateBanner("SIGN IN"));
});



const screens = document.querySelectorAll('.screen-carousel img');
let index = 0;

setInterval(() => {
  screens.forEach((img, i) => img.classList.toggle('active', i === index));
  index = (index + 1) % screens.length;
}, 3000); // every 3 seconds



// Entrance Animation
gsap.from(".form-container", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.2
  });
  
  // Toggle underline slide animation
  const underline = document.querySelector(".underline");
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  
  toggleBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      gsap.to(underline, {
        x: i === 0 ? "0%" : "100%",
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
  