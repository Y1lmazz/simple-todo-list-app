const todoText = document.querySelector(".todo-input");
const addButton = document.querySelector(".addButton");
const todoList = document.querySelector(".todo-list");
let todoArray = [];

const checklist = () => {
    if (todoList.children.length === 0) {
        const emptylist = document.createElement("li");
        emptylist.classList.add("empty-list");
        emptylist.innerText = "Liste Boş...";
        todoList.appendChild(emptylist);
    } else {
        const emptylist = todoList.querySelector(".empty-list");
        todoList.removeChild(emptylist);
    }
};

const saveToLocalStorage = () => {
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
};

const loadFromLocalStorage = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todoArray"));
    if (storedTodos) {
        todoArray = storedTodos;
        todoArray.forEach(todo => renderTodoItem(todo));
    }
};

const removeItem = (event) => {
    const todoItem = event.currentTarget.parentElement;
    const todoText = todoItem.querySelector("p").innerText;

    todoArray = todoArray.filter(todo => todo !== todoText);
    todoList.removeChild(todoItem);
    saveToLocalStorage();
    checklist();
};

const renderTodoItem = (todotext) => {
    const todoItemElement = document.createElement("li");

    const TextElement = document.createElement("p");
    todoItemElement.appendChild(TextElement);
    TextElement.innerText = todotext;

    const BtnElement = document.createElement("button");
    BtnElement.innerText = "Sil";
    BtnElement.classList.add("deleteButton");
    BtnElement.addEventListener("click", removeItem);
    todoItemElement.appendChild(BtnElement);

    todoList.insertBefore(todoItemElement, todoList.firstChild);

    todoText.value = "";
    todoText.focus();
    checklist();
};

const addTodo = () => {
    if (todoText.value === "") {
        alert("Liste boş olamaz!");
    } else {
        const newTodo = todoText.value;
        todoArray.push(newTodo);
        renderTodoItem(newTodo);
        saveToLocalStorage();
    }
};

window.addEventListener("DOMContentLoaded", () => {
    checklist();
    loadFromLocalStorage();
})


addButton.addEventListener("click", addTodo);

todoText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});