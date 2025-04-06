document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store JWT token in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            errorMessage.textContent = data.error;
        }
    } catch (error) {
        errorMessage.textContent = "Error connecting to server.";
    }
});
