// program for to-do app

// getting elements from html
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// function for adding task

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// function for saving data on local browser
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// function for showing data on webpage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
