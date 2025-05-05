document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        const response = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Registration successful! Please log in.");
          window.location.href = "login.html";
        } else {
          alert(data.error || "Registration failed.");
        }
      } catch (error) {
        alert("An error occurred while registering.");
      }
    });
  }
});
