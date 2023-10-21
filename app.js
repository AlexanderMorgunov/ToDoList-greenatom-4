import { URLS } from "./constants.js";
import { useHttp } from "./services/request.js";
import { loadingTodosObserver } from "./services/loadingTodosObserver.js";
import { loadingTodos } from "./services/loadingTodos.js";
import { validationForm } from "./services/validationForm.js";
import { taskItem } from "./components/task-item.js";
import { spinner } from "./components/spinner.js";

export const observer = loadingTodosObserver(loadingTodos);
export const getData = useHttp();

const todoList = document.querySelector("#todo-list");
const userTodo = document.querySelector("#user-todo");
const form = document.querySelector("form");

export const callbacks = {
  compleatHandler: (id, body) => {
    getData(`${URLS.TODOS}${id}`, "PATCH", body).then((data) => {
      const checkbox = document.querySelector(`#id${id}`);
      checkbox.children[0].children[0].checked = data.completed;
    });
  },
  deleteTask: (id, body) => {
    getData(`${URLS.TODOS}${id}`, "DELETE", body).then(() => {
      document.querySelector(`#id${id}`).remove();
    });
  },
};

const addTodo = (e) => {
  e.preventDefault();
  if (validationForm(e.target)) {
    const spinnerEl = spinner();
    todoList.prepend(spinnerEl);
    const userId = e.target[1].value;
    const title = e.target[0].value;
    const newTask = {
      userId,
      title,
      completed: false,
    };
    getData(URLS.TODOS, "POST", JSON.stringify(newTask))
      .then((data) => {
        getData(`${URLS.USERS}${data.userId}`).then(({ name }) => {
          todoList.prepend(taskItem(data, callbacks, name));
        });
      })
      .finally(() => {
        e.target.reset();
        spinnerEl.remove();
      });
  }
};

const getUsers = () => {
  getData(URLS.USERS).then((users) => {
    users.forEach((user) => {
      userTodo.append(new Option(user.name, user.id));
    });
  });
};

getUsers();

loadingTodos();

form.addEventListener("submit", addTodo);
