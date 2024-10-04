const navbarHTML = `
<nav>
  <ul class="flex">
    <li>
      <button
        class="nav-btns btn-1"
        id="groupChatBtn"
        onclick="location.href='chatlist.html'"
      >
        Group Chat
      </button>
    </li>
    <li>
      <button
        class="nav-btns manage-nav"
        id="manageUsersBtn"
        onclick="location.href='userlist.html'"
      >
        Manage Users
      </button>
    </li>
    <li>
      <button
        class="nav-btns"
        id="manageDocsBtn"
        onclick="location.href='document_list.html'"
      >
        Manage Documents
      </button>
    </li>
    <li>
      <button
        class="nav-btns"
        id="logoutBtn"
        onclick="location.href='logout.html'"
      >
        Logout
      </button>
    </li>
  </ul>
</nav>`;
document.getElementById("navbar").innerHTML = navbarHTML;
