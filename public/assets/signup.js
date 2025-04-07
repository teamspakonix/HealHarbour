document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    if (!signupForm) {
        console.error("❌ signupForm not found! Make sure the form ID is correct.");
        return;
    }

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // ✅ Prevent default form submission

        // ✅ Get form values
        const name = document.getElementById("name")?.value;
        const email = document.getElementById("email")?.value;
        const age = document.getElementById("age")?.value;
        const weight = document.getElementById("weight")?.value;
        const height = document.getElementById("height")?.value;
        const gender = document.getElementById("gender")?.value; // ✅ New!
        const contact = document.getElementById("contact")?.value;
        const address = document.getElementById("address")?.value;
        const password = document.getElementById("password")?.value;

        if (!name || !email || !password || !gender) {
            alert("❌ Please fill all required fields including gender!");
            return;
        }

        const userData = { name, email, age, weight, height, gender, contact, address, password };

        try {
            const response = await fetch("/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Signup successful! Redirecting to login...");
                window.location.href = "index.html";
            } else {
                alert("❌ Signup failed: " + data.error);
            }
        } catch (error) {
            alert("❌ Error connecting to server.");
            console.error("Signup Error:", error);
        }
    });
});



