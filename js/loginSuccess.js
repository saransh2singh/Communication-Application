window.onload = () => {
  // Get logged-in user's email from local storage
  const loggedInUsers = localStorage.getItem("LoggedInUsers")
    ? JSON.parse(localStorage.getItem("LoggedInUsers"))
    : [];
  const loggedInUser = loggedInUsers[loggedInUsers.length - 1]; // Assuming the last logged-in user is the current one
  const userEmail = loggedInUser.email;

  const welcomeMessage = document.getElementById("welcomeMessage");
  welcomeMessage.innerHTML = `<b>Welcome!</b> <span>${userEmail}</span>`;

  const navbarItems = document.querySelectorAll(".navbar-item");
  navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const href = item.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    });
  });
};
