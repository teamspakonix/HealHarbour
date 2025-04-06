// Example user data (replace this with actual form data)
const userData = {
    name: "John Doe",
    age: 30,
    height: 175,
    weight: 70,
    diet: "Vegan",
    stress: "Medium",
    exercise: 30, // in minutes
    meditation: 10, // in minutes
    mindGames: 15 // in minutes
};

// Function to fetch personalized schedule from backend
async function fetchSchedule(userData) {
    const response = await fetch('/generate-schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // Send user data to backend
    });

    const data = await response.json();

    if (data.schedule) {
        displaySchedule(data.schedule); // Display the schedule on the page
    } else {
        console.error('Error fetching schedule:', data.error);
    }
}

// Function to display schedule on the page
function displaySchedule(schedule) {
    const scheduleContainer = document.getElementById('scheduleContainer'); // Ensure this element exists in your HTML
    scheduleContainer.innerHTML = `<p>${schedule}</p>`; // Display the schedule
}

// Call fetchSchedule function (you can call it on form submission or any other event)
fetchSchedule(userData);
