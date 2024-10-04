// Check if a user is logged in
var loggedInUsers = localStorage.getItem("LoggedInUsers")
  ? JSON.parse(localStorage.getItem("LoggedInUsers"))
  : [];

// Redirect to welcome page if no user is logged in
if (loggedInUsers.length === 0) {
  window.location.href = "welcome.html"; // Update with your actual welcome page URL
}

window.onload = () => {
  // Get the index of the user to edit from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  // Retrieve registered users from local storage
  const users = localStorage.getItem("RegisteredUsers")
    ? JSON.parse(localStorage.getItem("RegisteredUsers"))
    : [];

  // Populate the form fields with the user's current information
  const user = users[index];
  document.getElementById("fullName").value = user.fullName;
  document.getElementById("email").value = user.email;

  // Add an event listener for the form submission
  document
    .getElementById("editUserForm")
    .addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the input values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();

      // Validate inputs
      if (!fullName || !email) {
        alert("All fields are required.");
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Update the user's details
      const oldFullName = users[index].fullName; // Store the old name for chat update
      users[index].fullName = fullName;
      users[index].email = email;

      // Update the logged-in user's details
      if (loggedInUsers.length > 0) {
        loggedInUsers[0].fullName = fullName; // Update fullName of logged in user
        loggedInUsers[0].email = email; // Update email of logged in user
        localStorage.setItem("LoggedInUsers", JSON.stringify(loggedInUsers)); // Save updated logged-in user
      }

      // Update chat messages
      let chats = JSON.parse(localStorage.getItem("chats")) || [];
      chats = chats.map((chat) => {
        if (chat.user === oldFullName) {
          return {
            ...chat,
            user: fullName, // Update the user name in chat if it matches the old name
          };
        }
        return chat;
      });
      localStorage.setItem("chats", JSON.stringify(chats)); // Save updated chat messages

      // Save the updated users array back to local storage
      localStorage.setItem("RegisteredUsers", JSON.stringify(users));
      alert("User Details Updated!");

      // Redirect to the user list page
      window.location.href = "userlist.html";
    });
};

// Highlight the active button
document.getElementById("manageUsersBtn").classList.add("active-btn");