document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUpForm");
    const signInForm = document.getElementById("signInForm");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const tradingViewId = document.getElementById("tradingViewId").value.trim();
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        const referralId = document.getElementById("referralId").value.trim(); // Optional

        // Password match check
        if (password !== repeatPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare data for backend
        const userData = {
            username,
            email,
            phone,
            trading_view_id: tradingViewId,
            password,
            referral_id: referralId || null // Send null if empty
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful! Please sign in.");
                signUpForm.classList.add("hidden"); // Hide signup form
                signInForm.classList.remove("hidden"); // Show signin form
            } else {
                alert(data.error || "Signup failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
