import { createElement } from "../services/createElement.js";

export const taskItem = (task, callbacks, name) => {
  const { userId, id, title, completed } = task;
  const { compleatHandler, deleteTask } = callbacks;

  return createElement(
    "li",
    {
      className: "todo-item",
      id: `id${id}`,
    },
    createElement(
      "div",
      {
        className: "task-wrapper-description",
      },
      createElement("input", {
        className: "task-isDone-checkbox",
        type: "checkbox",
        checked: completed,
        onclick: (e) => {
          e.preventDefault();
          task.completed = !task.completed;
          compleatHandler(id, JSON.stringify(task));
        },
      }),
      createElement("span", {
        className: "task-title",
        textContent: title,
      }),
      createElement("span", {
        className: "task-user",
        textContent: name,
      })
    ),
    createElement("button", {
      className: "task-btn-delete",
      onclick: () => {
        deleteTask(id, JSON.stringify(task));
      },
    })
  );
};
