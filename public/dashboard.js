const token = localStorage.getItem("token");
const container = document.getElementById("messagesContainer");

if (!token) {
  window.location.href = "admin.html";
}

async function loadMessages() {
  try {
    const res = await fetch("/api/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const messages = await res.json();

    if (!Array.isArray(messages)) {
      throw new Error(messages.error || "Unable to load messages");
    }

    if (messages.length === 0) {
      container.innerHTML = "<p>No messages submitted yet.</p>";
      return;
    }

    container.innerHTML = messages
      .map(
        (msg) => `
        <div class="message-card">
          <h3>Name: ${msg.name}</h3>
          <p><strong>Email:</strong> ${msg.email}</p>
          <p><strong>Message:</strong> ${msg.message}</p>
          <small>${new Date(msg.createdAt).toLocaleString()}</small>
          <br />
          <button onclick="deleteMessage('${msg._id}')">Delete</button>
        </div>
      `
      )
      .join("");
  } catch (err) {
    container.innerHTML = `<p style="color: crimson;">${err.message}</p>`;
  }
}

async function deleteMessage(id) {
  await fetch(`/api/messages/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  loadMessages();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin.html";
}

loadMessages();