document.getElementById("signInForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get user input
    const identifier = document.getElementById("signin-identifier").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    if (!identifier || !password) {
        console.log("hello")
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch("http://localhost:5000/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("user", JSON.stringify(data.user)); // Store user info in local storage
            window.location.href = "Home.html"; // Redirect to home page
        } else {
            console.error("Sign-in Error:", data.error); // Log the exact error in console
            alert(data.error || "Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});
