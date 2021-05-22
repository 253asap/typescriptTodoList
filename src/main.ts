const addBtn: Element = document.querySelector(".addButton");
const taskAddBtn: Element = document.querySelector(".taskAddButton");
const todoList: Element = document.querySelector(".todoList");
const textEntryName: Element = document.querySelector(".textEntryName");
const textEntryDesc: Element = document.querySelector(".textEntryDesc");

class TodoItem {
    taskName: string;
    taskDescription: string;
    taskCreationDate: Date = new Date();
    taskCompletionDate: string;
    taskCompleted: boolean = false;

    constructor(name: string, description: string, completionDate?: string) {
        this.taskName = name;
        this.taskDescription = description;
        this.taskCompletionDate = completionDate;
    }

    completeTask(): void {
        this.taskCompleted = !this.taskCompleted;
    }
}

class App {
    name: string;
    todoItems: TodoItem[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addTask(name: string, description: string, completiondate?: string): void {
        this.todoItems.push(new TodoItem(name, description, completiondate));
        this.updateDisplay();
    }

    completeTask(task: TodoItem): void {
        task.completeTask();
    }

    deleteTask(index: number): void {
        this.todoItems.splice(index, 1);
        this.updateDisplay();
    }
    updateDisplay(): void {
        todoList.innerHTML = "";
        this.todoItems.forEach((task) => {
            todoList.innerHTML += `
            <li class="listItem">
                <span>${task.taskName}</span>
                <button class="deleteButton">X</button>
            </li>
            `;
        });
        const delBtn = document.querySelectorAll(".deleteButton");
        for (let i = 0; i < delBtn.length; i++) {
            delBtn[i].addEventListener("click", () => {
                this.deleteTask(i);
            });
        }
    }
}

let TodoApp = new App("Asa White");

addBtn.addEventListener("click", () => {
    const entryBoxes = document.querySelectorAll(".textEntryToggle");
    entryBoxes.forEach((box) => {
        box.classList.remove("displayOff");
    });
});

taskAddBtn.addEventListener("click", () => {
    const taskName: string = (<HTMLInputElement>textEntryName).value;
    const taskDesc: string = (<HTMLTextAreaElement>textEntryDesc).value;
    TodoApp.addTask(taskName, taskDesc);
    const entryBoxes = document.querySelectorAll(".textEntryToggle");
    entryBoxes.forEach((box) => {
        box.classList.add("displayOff");
    });
});
