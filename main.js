const inputBox = document.querySelector("#inputBox");
const addTaskBtn = document.querySelector("#addTaskBtn");
const containerDiv = document.querySelector("#toDoContainer");

let toDos = [];
let id = 0;

addTaskBtn.addEventListener("click", () => {
  const textInput = inputBox.value.trim();
  if (textInput === "") return;
  const todo = {
    text: textInput,
    done: false,
    id: ++id,
  };
  toDos.push(todo);
  inputBox.value = "";

  displayToDo();
});

const displayToDo = () => {
  containerDiv.innerHTML = "";

  toDos.map((todo) => {
    
    const divELement = document.createElement("div");
    const inputElement = document.createElement("input");
    const textElement = document.createElement("h1");
    const editButtonElement = document.createElement("button");
    const deleteButtonElement = document.createElement("button");

    divELement.classList = "flex gap-2";

    inputElement.type = "checkbox";
    inputElement.addEventListener("click", (event) => {
      todo.done = inputElement.checked;

      const parentElement = event.target.parentElement;
      const targetH1 = parentElement.querySelector("h1");

      if (todo.done) {
        targetH1.classList = "line-through";
      } else {
        targetH1.classList = "text-xl font-bold";
      }
    });

    if (todo.done) inputElement.checked = true;
    else inputElement.checked = false;

    textElement.innerText = todo.text;

    if (todo.done) textElement.classList = "line-through";
    else textElement.classList = "text-xl font-bold";

    editButtonElement.textContent = "edit";
    editButtonElement.classList =
      "bg-cyan-500 ml-12 p-1 rounded-md text-sm text-white";
    editButtonElement.addEventListener("click", (event) => {
      const parentElement = event.target.parentElement;
      const newText = prompt("Enter new text:");
      if (newText) {
        parentElement.querySelector("h1").textContent = newText;
        todo.text = newText;
      }
    });

    deleteButtonElement.textContent = "delete";
    deleteButtonElement.classList =
      "bg-red-800 ml-12 p-1 rounded-md text-sm text-white";
    deleteButtonElement.addEventListener("click", (event) => {
      toDos = toDos.filter((t) => {
        return t.id != todo.id;
      });
      const parentElement = event.target.parentElement;
      containerDiv.removeChild(parentElement);
    });

    divELement.append(inputElement);
    divELement.append(textElement);
    divELement.append(editButtonElement);
    divELement.append(deleteButtonElement);
    containerDiv.append(divELement);
  });
};

displayToDo();
