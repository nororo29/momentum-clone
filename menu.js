const menu = document.querySelector(".js-menu"),
  content = menu.querySelector(".js-content");

function editName(event) {
  localStorage.removeItem('currentUser');
  location.reload();
}

function changeMenu(event) {
  menu.classList.toggle('change');
}

function init() {
  menu.addEventListener("click", changeMenu);
  content.addEventListener('click', editName);
}

init();
