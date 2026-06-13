const adminForm = document.getElementById("adminForm");
const adminMsg = document.getElementById("adminMsg");

function getCredentials() {
  return {
    email: document.getElementById("adminEmail").value.trim(),
    password: document.getElementById("adminPassword").value.trim(),
  };
}

adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getCredentials()),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    localStorage.setItem("token", data.token);
    adminMsg.textContent = "Login successful.";
    adminMsg.style.color = "green";

    window.location.href = "dashboard.html";
  } catch (err) {
    adminMsg.textContent = err.message;
    adminMsg.style.color = "crimson";
  }
});