// Retrieve registered users from local storage
var users = localStorage.getItem("RegisteredUsers")
  ? JSON.parse(localStorage.getItem("RegisteredUsers"))
  : [];
var loggedInUsers = localStorage.getItem("LoggedInUsers")
  ? JSON.parse(localStorage.getItem("LoggedInUsers"))
  : [];

// Get the email of the currently logged-in user
var loggedInEmail = JSON.parse(localStorage.getItem("LoggedInUsers")).slice(
  -1
)[0].email;

var htmlContent = "";
// Loop through each user and create a table row
for (var i = 0; i < users.length; i++) {
  htmlContent += "<tr id='user-" + i + "'>";
  htmlContent += "<td>" + users[i].fullName + "</td>";
  htmlContent += "<td class='center'>" + users[i].email + "</td>";

  // Check if the user is the logged-in user
  if (users[i].email === loggedInEmail) {
    // Disable the delete link for the logged-in user
    htmlContent +=
      "<td class='center'><a href='edit_user.html?index=" +
      i +
      "'>Edit</a> | <a class='disabled-link' href=''>Delete</a></td>";
  } else {
    htmlContent +=
      "<td class='center'><a href='edit_user.html?index=" +
      i +
      "'>Edit</a> | <a href='' onclick='deleteUser(" +
      i +
      ")'>Delete</a></td>";
  }

  htmlContent += "</tr>";
}
document.write(htmlContent);

// Function to delete a user
const deleteUser = (index) => {
  if (confirm("Are you Sure?")) {
    // Remove the user from the array
    users.splice(index, 1);
    // Update local storage
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    // Reload the page to reflect changes
    location.reload();
  }
};

// Highlight the active button
document.getElementById("manageUsersBtn").classList.add("active-btn");
