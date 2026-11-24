import { Task } from "./models/Task.js";
import { Status } from "./models/Status.js";
import { TaskService } from "./service/TaskService.js";
import { formatDate, validateTitle } from "./service/Utilities.js";
import { Priority } from "./models/Priority.js";
import type { TaskData } from "./models/TaskData.js";

const listElement = document.querySelector("#task ul") as HTMLUListElement;
const inputTitle = document.querySelector("#title input") as HTMLInputElement;
const inputDescription = document.querySelector("#description input") as HTMLInputElement;
const selectStatus = document.querySelector("#status select") as HTMLSelectElement;
const selectPriority = document.querySelector("#priority select") as HTMLSelectElement;
const addTaskButton = document.querySelector("#addTask") as HTMLElement;
const createTaskButton = document.querySelector("#createTaskButton") as HTMLElement;
const hideTaskButton = document.querySelector("#hideTaskButton") as HTMLElement;
const taskFields = document.querySelector("#taskFields") as HTMLDivElement;

const taskList: TaskService = new TaskService();
carregarDados();
renderTasks();

function mostrarCampos(): void {
    taskFields.hidden = false;
}

function esconderCampos(): void {
    taskFields.hidden = true;
}

function renderTasks(): void {
    listElement.replaceChildren();
    for (const task of taskList.listTasks()) {
        const li = document.createElement("li");
        const resumo = task.description ? `Título: ${task.title}\nDescrição: ${task.description}` : `Título: ${task.title}`;
        const { date, time } = formatDate(task.createdOn);
        li.textContent = `${resumo}\nStatus: ${task.status}\nPrioridade: ${task.priority}\nCriada em: ${date} às ${time}`
        listElement.appendChild(li);
       
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remover";
        removeButton.id = "removeTask";

        removeButton.addEventListener("click", () => removerTarefa(task.id));
        li.appendChild(removeButton);
    }              
}

function adicionarTarefa(): boolean {
    const title = inputTitle.value.trim();
    const description = inputDescription.value;
    const status = Object.values(Status).find(value => value === selectStatus.value);
    const priority = Object.values(Priority).find(value => value === selectPriority.value);

    if (!validateTitle(title)) {
        alert("Digite alguma tarefa!");
        return false;
    } else {
        const task = new Task(title, description, status, priority);
        taskList.addTask(task);
        salvarDados();
        renderTasks();
        inputTitle.value = "";
        inputDescription.value = "";
        return true;
    };
}

function removerTarefa(taskId: string): boolean{
    if(!taskList.removeTask(taskId)) return false;
    salvarDados();
    renderTasks();
    return true;    
}

createTaskButton.addEventListener("click", mostrarCampos);
addTaskButton.addEventListener("click", adicionarTarefa);
hideTaskButton.addEventListener("click", esconderCampos);

function salvarDados() {
    const mapper = taskList.listTasks().map((task): TaskData =>({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        createdOn: task.createdOn.toISOString(),
        ...(task.description !== undefined ? {description: task.description} : {}),
        ...(task.editedOn !== undefined ? {editedOn: task.editedOn?.toISOString()} : {}),
    }));
    localStorage.setItem("@task_list", JSON.stringify(mapper));
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem("@task_list");
    if (dadosSalvos === null) return;
    const dados = JSON.parse(dadosSalvos);
    for(const item of dados){
        console.log(item)
        const task = Task.fromSavedData(item);
        taskList.addTask(task); 
    }
}