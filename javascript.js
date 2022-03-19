const inputTask = document.getElementById("add-task");
const buttonAddTask = document.querySelector(".button-add-task");
const boxPrintWork = document.querySelector(".box-print-work");
const filterTodo = document.querySelector(".filter_todo");

buttonAddTask.addEventListener("click", todoList);
boxPrintWork.addEventListener("click", deletePerform);
filterTodo.addEventListener("click", filterTodoList);
document.addEventListener("DOMContentLoaded", saveLocalstorageHtml)

function todoList() {
    const printWork = document.createElement("li");
    printWork.classList.add("print-work");

    saveLocalStorageTodo(inputTask.value);

    const getText = document.createElement("p");
    getText.classList.add("get-text");
    getText.innerText = inputTask.value;
    printWork.appendChild(getText);
    inputTask.value = "";

    const buttonPerform = document.createElement("div");
    buttonPerform.classList.add("button-perform");
    buttonPerform.innerText = "Perform";
    printWork.appendChild(buttonPerform);

    const buttonDelete = document.createElement("div");
    buttonDelete.classList.add("button-delete");
    buttonDelete.innerText = "Delete";
    printWork.appendChild(buttonDelete);

    boxPrintWork.appendChild(printWork);
}

function saveLocalStorageTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function localStorageTodoDelete(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const indexOfInnerText = todo.children[0].innerText
    todos.splice(todos.indexOf(indexOfInnerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deletePerform(event) {
    const item = event.target;
    if (item.classList[0] === "button-delete") {
        const parDelete = item.parentElement;
        localStorageTodoDelete(parDelete)
        parDelete.remove()
    }
    if (item.classList[0] === "button-perform") {
        const parDelete = item.parentElement.children[0];
        parDelete.classList.toggle("get-text-perform");
    }
}

function filterTodoList(event) {
    const todos = boxPrintWork.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.firstChild.classList.contains("get-text-perform")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.firstChild.classList.contains("get-text-perform")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}

function saveLocalstorageHtml() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        const printWork = document.createElement("li");
        printWork.classList.add("print-work");
        console.log(printWork);

        const getText = document.createElement("p");
        getText.classList.add("get-text");
        getText.innerText = todo;
        printWork.appendChild(getText);

        const buttonPerform = document.createElement("div");
        buttonPerform.classList.add("button-perform");
        buttonPerform.innerText = "Perform";
        printWork.appendChild(buttonPerform);

        const buttonDelete = document.createElement("div");
        buttonDelete.classList.add("button-delete");
        buttonDelete.innerText = "Delete";
        printWork.appendChild(buttonDelete);

        boxPrintWork.appendChild(printWork);
    })

    function deletePerform(event) {
        const item = event.target;
        if (item.classList[0] === "button-delete") {
            const parDelete = item.parentElement;
            localStorageTodoDelete(parDelete)
            parDelete.remove()
        }
        if (item.classList[0] === "button-perform") {
            const parDelete = item.parentElement.children[0];
            parDelete.classList.toggle("get-text-perform");
        }
    }
}