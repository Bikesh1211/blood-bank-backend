window.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbarContainer").innerHTML = html;

      const userData = localStorage.getItem("userData");
      const token = JSON.parse(userData).data.token;
      console.log("🚀 ~ .then ~ token:", token);
      const logoutButton = document.getElementById("logout-btn");
      const logoutLi = document.getElementById("logout-li");
      const userNameLink = document.getElementById("userNameLink");
      const userName = JSON.parse(userData).data.fullName;
      const isSuccess = JSON.parse(userData)?.data?.success;
      document.getElementById("userNameLink").innerText = userName;
      logoutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.replace("index.html");
      });

      if (Boolean(token)) {
        logoutLi.classList.remove("d-none");
        userNameLink.classList.remove("d-none");
        document
          .getElementById("login-btn")
          .parentNode.parentNode.classList.add("d-none");
        document
          .getElementById("register-btn")
          .parentNode.parentNode.classList.add("d-none");
        document.getElementById("add-post").classList.remove("d-none");
        logoutButton.classList.remove("d-none");
      } else {
        logoutLi.classList.add("d-none");
      }
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
