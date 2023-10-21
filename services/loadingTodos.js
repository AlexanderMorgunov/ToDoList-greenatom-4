import { URLS } from "../constants.js";
import { callbacks, getData, observer } from "../app.js";
import { taskItem } from "../components/task-item.js";
import { spinner } from "../components/spinner.js";

export const loadingTodos = async (page = 1, limit = 10, totalCount = 200) => {
  const todoList = document.querySelector("#todo-list");
  const spinnerEl = spinner();
  todoList.append(spinnerEl);
  const data = await getData(`${URLS.TODOS}?_limit=${limit}&_page=${page}`);
  data.forEach((el, i) => {
    getData(`${URLS.USERS}${el.userId}`).then(({ name }) => {
      spinnerEl.remove();
      todoList.append(taskItem(el, callbacks, name));
      if ((i + 1) % limit === 0) {
        let element = document.querySelector(`#id${el.id}`);
        observer.observe(element);
      }
    });
  });
  if (todoList.children.length >= totalCount) {
    spinnerEl.remove();
  }
};
