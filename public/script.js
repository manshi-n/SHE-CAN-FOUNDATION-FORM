const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameRegex = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!nameRegex.test(name)) {
    responseMsg.textContent =
      "Name should start with a capital letter, like Manshi or Manshi Negi.";
    responseMsg.style.color = "crimson";
    return;
  }

  if (!gmailRegex.test(email)) {
    responseMsg.textContent = "Please enter a valid Gmail address.";
    responseMsg.style.color = "crimson";
    return;
  }

  if (message.length < 3) {
    responseMsg.textContent = "Message should contain at least 3 characters.";
    responseMsg.style.color = "crimson";
    return;
  }

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Submission failed.");
    }

    responseMsg.textContent = "Form Submitted Successfully";
    responseMsg.style.color = "green";
    form.reset();
  } catch (err) {
    responseMsg.textContent = err.message;
    responseMsg.style.color = "crimson";
  }
});