// Check if a user is logged in
var loggedInUsers = localStorage.getItem("LoggedInUsers")
  ? JSON.parse(localStorage.getItem("LoggedInUsers"))
  : [];

// Redirect to welcome page if no user is logged in
if (loggedInUsers.length === 0) {
  window.location.href = "welcome.html"; // Update with your actual welcome page URL
}
