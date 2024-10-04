const validate = () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const email = document.getElementsByClassName("email")[0].value;
  const password = document.getElementsByClassName("password")[0].value;

  // Validate email and password fields
  if (email === "") {
    alert("Please enter your email");
    return false;
  } else if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  } else if (password === "") {
    alert("Please enter your password");
    return false;
  }

  // Retrieve registered users from local storage
  const users = localStorage.getItem("RegisteredUsers")
    ? JSON.parse(localStorage.getItem("RegisteredUsers"))
    : [];

  // Check if user exists in registered users
  const user = users.find((u) => u.email === email);

  // If user does not exist, redirect to registration page
  if (!user) {
    alert("User not registered");
    window.location.href = "register.html";
    return false;
  }

  // Validate password
  if (user.password !== password) {
    alert("Wrong Password");
    return false;
  }

  // If login is successful, store user information in LoggedInUsers
  const loggedInUsers = localStorage.getItem("LoggedInUsers")
    ? JSON.parse(localStorage.getItem("LoggedInUsers"))
    : [];

  // Check if the user is already logged in
  if (!loggedInUsers.some((u) => u.email === email)) {
    loggedInUsers.push(user); // Only add if user is not already logged in
  }

  localStorage.setItem("LoggedInUsers", JSON.stringify(loggedInUsers));

  // Redirect to login successful page
  window.location.href = "loginSuccess.html";
  return false;
};
