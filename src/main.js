import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import "./main.css";


const FormAddBtn = $(".form__btn");
const toDoList = $(".todos-wrapper");
const formInput = $(".form__input");

const STORAGE_KEY = "todoListKey";

// load from storage
function loadTodos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// save to storage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// render all todos
function renderTodos() {
  toDoList.empty();

  const todos = loadTodos();
  todos.forEach((todo, index) => {
    const $item = $("<li></li>").addClass("todo-item");
    if (todo.completed) {
      $item.addClass("todo-item-checked");
    }

    // чекбокс
    const $checkbox = $("<input type='checkbox'>").prop("checked", todo.completed);
    $item.append($checkbox);

    // текст
    const $span = $("<span></span>")
      .addClass("todo-item__description")
      .text(todo.text);
    $item.append($span);

    // кнопка удалить
    const $delBtn = $("<button></button>")
      .addClass("todo-item__delete")
      .text("Видалити");
    $item.append($delBtn);

    // data-index для правильной работы при рендере
    $item.attr("data-index", index);

    toDoList.append($item);
  });
}

// initial render
$(function () {
  renderTodos();
});

// add todo
FormAddBtn.on("click", (e) => {
  e.preventDefault(); // чтобы не было перезагрузки
  const inputValue = formInput.val().trim();
  if (!inputValue) return;

  const todos = loadTodos();
  todos.push({ text: inputValue, completed: false });
  saveTodos(todos);

  formInput.val("");
  renderTodos();
});

// делегирование событий

// toggle checkbox
toDoList.on("change", "input[type='checkbox']", function (e) {
  e.stopPropagation();
  const index = $(this).closest(".todo-item").data("index");

  const todos = loadTodos();
  todos[index].completed = $(this).is(":checked");
  saveTodos(todos);

  renderTodos();
});

// delete button
toDoList.on("click", ".todo-item__delete", function (e) {
  e.stopPropagation();
  const index = $(this).closest(".todo-item").data("index");

  const todos = loadTodos();
  todos.splice(index, 1);
  saveTodos(todos);

  renderTodos();
});

// modal
const modalElement = document.getElementById("myModal");
const myModal = new Modal(modalElement, { backdrop: "static" });

toDoList.on("click", "li", function (e) {
  // не открываем модалку если клик был по чекбоксу или кнопке
  if ($(e.target).is("input, button")) return;

  const text = $(this).find(".todo-item__description").text();
  $(".todoModalText").text(text);
  myModal.show();
});
