// On page load
window.onload = () => {
  displayLoggedinUser();
  loadChatMessages();
  const navbarItems = document.querySelectorAll(".nav-btns");
  navbarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const href = item.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    });
  });
};

// Display logged-in user's fullName from LoggedInUsers
const displayLoggedinUser = () => {
  const loggedInUsers = JSON.parse(localStorage.getItem("LoggedInUsers")) || [];

  // Assuming only one logged-in user
  const currentUser = loggedInUsers[0]; // First user in the array

  // Display fullName if the user exists, otherwise 'Guest'
  const fullName = currentUser ? currentUser.fullName : "Guest";
  document.getElementById("loggedin-user").textContent = fullName;
};

// Load messages from local storage
const loadChatMessages = () => {
  const chatBox = document.getElementById("chat-box");
  const chats = JSON.parse(localStorage.getItem("chats")) || [];

  // Clear current chatBox
  chatBox.innerHTML = "";

  chats.forEach((chat) => {
    const chatMessage = document.createElement("p");
    chatMessage.textContent = `[${chat.timestamp}] ${chat.user} : ${chat.message}`;
    chatBox.appendChild(chatMessage);
  });

  // Scroll to the bottom of chatBox
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Send new message
const sendMessage = () => {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();

  // Validate message input
  if (!messageText) {
    alert("Message input is mandatory");
    return;
  }

  const loggedInUsers = JSON.parse(localStorage.getItem("LoggedInUsers")) || [];
  const currentUser = loggedInUsers[0]; // First user in the array
  const fullName = currentUser ? currentUser.fullName : "Guest";

  const newChat = {
    user: fullName,
    message: messageText,
    timestamp: new Date().toLocaleString(),
  };

  // Save message to local storage
  let chats = JSON.parse(localStorage.getItem("chats")) || [];
  chats.push(newChat);
  localStorage.setItem("chats", JSON.stringify(chats));

  // Reload chat messages
  loadChatMessages();

  // Clear input field
  messageInput.value = "";
};

// Refresh page
const refreshPage = () => {
  location.reload();
};

// Close chat
const closeChat = () => {
  alert("Closing the chat");
};

document.getElementById("groupChatBtn").classList.add("active-btn");
