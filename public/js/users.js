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
    if (user.role === "student") {
      cardElement.innerHTML = ``;
    }
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-4"); // Bootstrap column size
    cardElement.innerHTML = `
    <div class="border rounded-4 p-4 mb-4">
    <div class="col-6 d-flex align-items-center gap-4">
    <img src="https://www.looper.com/img/gallery/harry-potter-why-is-snape-so-mean-to-the-boy-who-lived/intro-1691673459.jpg" class="img-fluid rounded" alt="Avatar">
    <h4 class="">${user.fullName}</h4>
</div>
    <div class="card-body">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five </p>

        <table class="table table-borderless table-sm">
        <tbody>
        <tr>
        <th scope="row">Gender</th>
        <td class='text-capitalize'>${user.gender}</td>
        </tr>
        <tr >
        <th scope="row">Address</th>
        <td>${user.address}</td>
      </tr>
      <tr>
      <th scope="row">Contact</th>
      <td>${user.phone}</td>
    </tr>
          <tr>
            <th scope="row">Email</th>
            <td>${user.email}</td>
          </tr>

        </tbody>
    </table>
        <div class="d-grid gap-2 col-12 mx-auto">
        <button class="btn btn-success mb-2">Hire Tutor</button>
    </div>
    
    </div>
</div>
`;

    userListContainer.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
