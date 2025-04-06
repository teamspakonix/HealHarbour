document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // ✅ Prevent default page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/auth/login", { // ✅ Corrected API URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Login successful! Redirecting to dashboard...");
            localStorage.setItem("token", data.token);  // ✅ Store JWT token
            localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
            window.location.href = "mainpage.html"; // ✅ Redirect to dashboard (mainpage.html)
        } else {
            alert("❌ Login failed: " + data.error);
        }
    } catch (error) {
        alert("❌ Error connecting to server.");
        console.error("Login Error:", error);
    }
});

