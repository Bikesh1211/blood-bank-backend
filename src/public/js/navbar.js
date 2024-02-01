window.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbarContainer").innerHTML = html;
    })
    .catch((error) => console.error("Error loading navbar:", error));
});
