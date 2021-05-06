const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInp.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name} joined the chat.`, "right");
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name}: left the chat.`, "right");
});
