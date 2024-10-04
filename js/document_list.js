var uploadFiles = JSON.parse(localStorage.getItem("uploads")) || [];
var currentEditIndex = -1;
var deleteIndex = -1; // Index for delete confirmation

const editFile = (index) => {
  currentEditIndex = index;
  document.getElementById("editDescription").value =
    uploadFiles[index].description;

  // Show the edit modal
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
};

const saveEdit = () => {
  if (currentEditIndex >= 0) {
    const newDescription = document.getElementById("editDescription").value;
    uploadFiles[currentEditIndex].description = newDescription;
    localStorage.setItem("uploads", JSON.stringify(uploadFiles));
    loadUploads(); // Update the table
    const editModal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    editModal.hide();
  }
};

const loadUploads = () => {
  let htmlContent = "";
  for (let i = 0; i < uploadFiles.length; i++) {
    // Only display if there's a valid entry
    if (uploadFiles[i].description && uploadFiles[i].filename) {
      htmlContent += "<tr>";
      htmlContent += "<td>" + uploadFiles[i].description + "</td>";
      htmlContent += "<td>" + uploadFiles[i].filename + "</td>";
      htmlContent +=
        "<td><a href='#' class='color-change' onClick='editFile(" +
        i +
        ")'>Edit</a> | <a class='color-change' href='#' onClick='showDeleteModal(" +
        i +
        ")'>Delete</a> </td>";
      htmlContent += "</tr>";
    }
  }
  document.getElementById("uploadTableBody").innerHTML = htmlContent;
};

const showDeleteModal = (index) => {
  deleteIndex = index; // Set the index to be deleted
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
  );
  deleteModal.show(); // Show the delete confirmation modal
};

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  if (deleteIndex >= 0) {
    uploadFiles.splice(deleteIndex, 1);
    localStorage.setItem("uploads", JSON.stringify(uploadFiles));
    loadUploads(); // Update the table
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    deleteModal.hide(); // Hide the delete modal
  }
});

document.getElementById("uploadNowBtn").addEventListener("click", () => {
  const filenameInput = document.getElementById("filename");
  const descriptionInput = document.getElementById("description");

  // Check if a file is selected
  if (filenameInput.files.length > 0 && descriptionInput.value.trim()) {
    const userId = JSON.parse(localStorage.getItem("LoggedInUsers")).slice(
      -1
    )[0].id; // Get current user ID
    const file = {
      userId: userId,
      description: descriptionInput.value,
      filename: filenameInput.files[0].name,
    };

    // Add the new file to the global uploadFiles array
    uploadFiles.push(file);
    localStorage.setItem("uploads", JSON.stringify(uploadFiles));

    // Update the table
    loadUploads();

    // Close the modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("exampleModal")
    );
    modal.hide();

    // Clear inputs
    filenameInput.value = "";
    descriptionInput.value = "";
  } else {
    alert("Please select a file and provide a description.");
  }
});

document.getElementById("saveEditBtn").addEventListener("click", saveEdit);

// Load uploads when the page loads
loadUploads();
document.getElementById("manageDocsBtn").classList.add("active-btn");
