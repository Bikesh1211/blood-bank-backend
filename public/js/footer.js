// footer.js
document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.getElementById("footerContainer");
  const footerPath = "footer.html"; // Adjust the path as per your file structure

  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});
