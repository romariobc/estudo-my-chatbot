
// script.js

document.addEventListener("DOMContentLoaded", initChat);

function initChat() {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    addMessageToChat(chatMessages, "user-message", message);
    userInput.value = "";

    try {
      const response = await sendMessageToAPI(message);
      addMessageToChat(chatMessages, "bot-message", response);
    } catch (error) {
      handleError(chatMessages, error);
    }
  });
}

function addMessageToChat(chatMessages, className, message) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessageToAPI(message) {
  try {
    const response = await axios.post("/chat", {
      messages: [{ role: "user", content: message }],
    });
    return response.data.response;
  } catch (error) {
    throw error;
  }
}

function handleError(chatMessages, error) {
  console.error("Error:", error);
  addMessageToChat(chatMessages, "error-message", "Não tem ninguém em casa.");
}






























































// script.js

/*document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  chatForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = userInput.value.trim();
      if (message === "") return;

      addMessageToChat("user-message", message);
      userInput.value = "";

      const response = await sendMessageToAPI(message);
      addMessageToChat("bot-message", response);
  });

  function addMessageToChat(className, message) {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${className}`;
      messageElement.innerText = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessageToAPI(message) {
      try {
          const response = await fetch("/chat", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
              //body: JSON.stringify({
                //  messages: [{ role: "user", content: message }],
             // }),
          });
          const data = await response.json();
          return data.response;
      } catch (error) {
          console.error("Error: ", error);
          return "Sorry, there was an error. Please try again.";
      }
  }
});

*/























































