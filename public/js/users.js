async function getUsers() {
  try {
    const response = await fetch("http://localhost:2003/users");
    const users = await response.json();
    renderUsers(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

function renderUsers(users) {
  const userListContainer = document.getElementById("userList");
  userListContainer.innerHTML = ""; // Clear previous content

  users.forEach((user) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-3"); // Bootstrap column size
    cardElement.innerHTML = `
    <div class="card mb-5 shadow" style="max-width: 18rem;">
    <img src="https://images.ctfassets.net/pdf29us7flmy/4hFcXfNyX4qKeKXEPjQhy6/e3f89662f430dd94ffb67ad06e518963/ENtwvqMg.png" class="card-img-top" alt="User Image">
    <div class="card-body">
        <h5 class="card-title">${user.fullName}</h5>
        <ul class='list-unstyled'>
            <li class="card-text"><strong>Username:</strong> ${user.username}</li>
            <li class="card-text"><strong>Email:</strong> ${user.email}</li>
            <li class="card-text"><strong>Address:</strong> ${user.Address}</li>
            <li class="card-text"><strong>Contact:</strong> ${user.contact}</li>
            <li class="card-text"><strong>Description:</strong> ${user.Description}</li>
        </ul>
        <a href="#" class="btn btn-primary btn-sm">View Profile</a>
    </div>
</div>
`;
    userListContainer.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
