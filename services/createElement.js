const propNames = new Set([
  "id",
  "className",
  "textContent",
  "onclick",
  "onsubmit",
]);

export const createElement = (name, props = {}, ...children) => {
  const element = document.createElement(name);

  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else if (props[name]) {
      element.setAttribute(name, props[name]);
    }
  }

  for (const child of children) {
    element.append(child);
  }

  return element;
};
