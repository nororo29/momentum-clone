const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  const hours = new Date().getHours();
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);

  if(hours > 4 && hours < 12) {
    greeting.innerText = `Good morning, ${text}`;
  } else if (hours >= 12 && hours < 17) {
    greeting.innerText = `Good afternoon, ${text}`;
  } else if (hours >= 17 && hours < 22) {
    greeting.innerText = `Good evening, ${text}`;
  } else {
    greeting.innerText = `Good night, ${text}`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
