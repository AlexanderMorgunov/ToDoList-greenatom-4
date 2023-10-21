export const validationForm = (form) => {
  const title = form[0];
  const user = form[1];
  if (validationInput(title) && validationInput(user)) {
    return true;
  } else return false;
};

function validationInput(input) {
  input.classList.remove("input-error");

  if (input.type === "text") {
    if (input.value.trim().length === 0) {
      input.classList.add("input-error");
      return false;
    } else {
      return true;
    }
  } else if (input.type === "select-one") {
    if (input.value === "select user") {
      input.classList.add("input-error");
      return false;
    } else {
      return true;
    }
  }

  return true;
}
