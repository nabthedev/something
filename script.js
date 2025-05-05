document.addEventListener("DOMContentLoaded", () => {
  // Handle login
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        const response = await fetch("/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = "forums.html";
        } else {
          alert(data.error);
        }
      } catch (err) {
        alert("Error logging in!");
      }
    });
  }

  // Fetch forums
  const forumsContainer = document.querySelector("#forums");
  if (forumsContainer) {
    fetch("/api/forums")
      .then((res) => res.json())
      .then((forums) => {
        forumsContainer.innerHTML = forums
          .map(
            (forum) =>
              `<div>
                <h3>${forum.name}</h3>
                <p>${forum.description}</p>
                <a href="threads.html?forumId=${forum._id}">View Threads</a>
              </div>`
          )
          .join("");
      });
  }
});
