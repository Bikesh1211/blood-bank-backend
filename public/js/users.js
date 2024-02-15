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
    cardElement.classList.add("col-4"); // Bootstrap column size
    cardElement.innerHTML = `
    <div class="border rounded-4 p-4 mb-4">
    <img src="https://www.pluggedin.com/wp-content/uploads/2019/12/bad-teacher-1200x901.jpg" class="card-img-top" alt="User Image">
    <div class="card-body">
        <h4 class="card-title">${user.fullName}</h4>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five </p>
        <ul class='list-unstyled'>
            <li class="card-text"><strong>Email:</strong> ${user.email}</li>
            <li class="card-text"><strong>Address:</strong> ${user.Address}</li>
            <li class="card-text"><strong>Contact:</strong> ${user.phone}</li>
        </ul>
        <div class="d-flex justify-content-end">
        <button class="btn btn-primary mb-2">Hire Tutor</button>
    </div>
    
    </div>
</div>
`;
    //     cardElement.innerHTML = `
    //     <div class="card mb-5 shadow" style="max-width: 18rem;">
    //     <img src="https://images.ctfassets.net/pdf29us7flmy/4hFcXfNyX4qKeKXEPjQhy6/e3f89662f430dd94ffb67ad06e518963/ENtwvqMg.png" class="card-img-top" alt="User Image">
    //     <div class="card-body">
    //         <h5 class="card-title">${user.fullName}</h5>
    //         <ul class='list-unstyled'>
    //             <li class="card-text"><strong>Username:</strong> ${user.username}</li>
    //             <li class="card-text"><strong>Email:</strong> ${user.email}</li>
    //             <li class="card-text"><strong>Address:</strong> ${user.Address}</li>
    //             <li class="card-text"><strong>Contact:</strong> ${user.contact}</li>
    //             <li class="card-text"><strong>Description:</strong> ${user.Description}</li>
    //         </ul>
    //         <a href="#" class="btn btn-primary btn-sm">View Profile</a>
    //     </div>
    // </div>
    // `;
    userListContainer.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
