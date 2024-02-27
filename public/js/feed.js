async function getUsers() {
  try {
    const response = await fetch("http://localhost:2003/feeds");
    const feeds = await response.json();
    console.log("🚀 ~ getUsers ~ feeds:", feeds);
    renderUsers(feeds);
    return feeds;
  } catch (error) {
    console.error("Error fetching feeds:", error);
    return [];
  }
}

function renderUsers(users) {
  const userListContainer = document.getElementById("feed-list");
  userListContainer.innerHTML = ""; // Clear previous content

  users.forEach((data) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-xl-7");
    cardElement.innerHTML = `
    <div class="col-sm-12 border rounded-4 p-5 mb-4">
    <div class="row text-center">
        <div class="col-4">
        <img src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg" class="img-fluid rounded" alt="Avatar">
                <h5 class="">Bikesh Chaudhary</h5>
        </div>
        <div class="col-6 text-start">
            <p>Looking for a Teacher who can teach me at an Affordable Rate</p>
            <p class="text-secondary">Post on: 23/12/2020<br>Deadline: 23/12/2020</p>
        </div>
        


    </div>
    <table class="table">
        <tbody>
          <tr>
            <th scope="row">Subject</th>
            <td>${data.subject}</td>
          </tr>
          <tr>
            <th scope="row">Class</th>
            <td>${data.class}</td>

          </tr>
          <tr>
            <th scope="row">Medium</th>
            <td>${data.medium}</td>
          </tr>
          <tr>
            <th scope="row">Salary</th>
            <td>${data.salary}</td>
          </tr>
          <tr>
            <th scope="row">Location</th>
            <td>${data.location}</td>
          </tr>
          <tr>
            <th scope="row">Prefered University</th>
            <td>${data.prefered_university}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-grid gap-2 col-12 mx-auto">
        <button class="btn btn-outline-success mb-2">Apply</button>
    </div>

</div>
  `;
    userListContainer.appendChild(cardElement);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getUsers();
});
