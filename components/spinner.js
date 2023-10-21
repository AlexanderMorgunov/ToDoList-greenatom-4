import { createElement } from "../services/createElement.js";

export const spinner = () => {
  return createElement(
    "div",
    {
      className: "task-spinner-wrapper",
    },
    createElement("div", {
      className: "task-spinner",
    })
  );
};
