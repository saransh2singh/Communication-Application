document
  .getElementById("registrationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    const errorMsg = document.getElementById("error-msg");

    if (!fullName || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("User already exists.");
      window.location.href = "login.html";
      return;
    }

    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
    };

    users.push(newUser);
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "register_success.html";
  });
