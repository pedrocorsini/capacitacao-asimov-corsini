import { Task } from "./models/Task.js";
import { Status } from "./models/Status.js";
import { TaskService } from "./service/TaskService.js";
import { formatDate, validateTitle } from "./service/Utilities.js";
import { Priority } from "./models/Priority.js";
import type { TaskData } from "./models/TaskData.js";

const inputTitle = document.querySelector("#titleInput") as HTMLInputElement;
const inputDescription = document.querySelector("#descriptionInput") as HTMLInputElement;
const selectStatus = document.querySelector("#status select") as HTMLSelectElement;
const selectPriority = document.querySelector("#priority select") as HTMLSelectElement;

const newTaskButton = document.querySelector("#newTaskButton") as HTMLElement;
const cancelButton = document.querySelector("#cancelButton") as HTMLElement;
const taskForm = document.querySelector("#taskForm") as HTMLFormElement;

const pendingList = document.querySelector("#pendingTasks") as HTMLUListElement;
const inProgressList = document.querySelector("#inProgressTasks") as HTMLUListElement;
const completedList = document.querySelector("#completedTasks") as HTMLUListElement;

let editingTaskId: string | null = null;

const taskList: TaskService = new TaskService();
carregarDados();
renderTasks();

function mostrarCampos(): void {
    taskForm.hidden = false;
}

function esconderCampos(): void {
    taskForm.hidden = true;
}

function renderTasks(): void {
    pendingList.replaceChildren();
    inProgressList.replaceChildren();
    completedList.replaceChildren();

    for (const task of taskList.listTasks()) {
        const li = document.createElement("li");
        const resumo = task.description ? `Título: ${task.title}\nDescrição: ${task.description}` : `Título: ${task.title}`;
        const { date, time } = formatDate(task.createdOn);

        li.textContent = `${resumo}\nPrioridade: ${task.priority}\nCriada em: ${date} às ${time}`;
        if (task.editedOn) {
            const { date, time } = formatDate(task.editedOn);
            li.textContent += `\nEditada em: ${date} às ${time}`
        }

        if(task.status == "Pendente") pendingList.appendChild(li);
        if(task.status == "Em Andamento") inProgressList.appendChild(li);
        if(task.status == "Concluída") completedList.appendChild(li);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remover";
        removeButton.id = "removeTask";
        removeButton.addEventListener("click", () => removerTarefa(task.id));

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Editar";
        editButton.id = "editTask";
        editButton.addEventListener("click", () => editarTarefa(task.id));

        li.appendChild(editButton);
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

function removerTarefa(taskId: string): boolean {
    if (!taskList.removeTask(taskId)) return false;
    salvarDados();
    renderTasks();
    return true;
}


function editarTarefa(taskId: string): void {
    const task = taskList.findById(taskId);
    if (!task) return;

    editingTaskId = task.id;
    inputTitle.value = task.title;
    inputDescription.value = task.description ?? "";
    selectStatus.value = task.status;
    selectPriority.value = task.priority;

    mostrarCampos();
    inputTitle.focus();
}

function salvarDados() {
    const mapper = taskList.listTasks().map((task): TaskData => ({
        id: task.id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        createdOn: task.createdOn.toISOString(),
        ...(task.description !== undefined ? { description: task.description } : {}),
        ...(task.editedOn !== undefined ? { editedOn: task.editedOn?.toISOString() } : {}),
    }));
    localStorage.setItem("@task_list", JSON.stringify(mapper));
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem("@task_list");
    if (dadosSalvos === null) return;
    const dados = JSON.parse(dadosSalvos);
    for (const item of dados) {
        console.log(item)
        const task = Task.fromSavedData(item);
        taskList.addTask(task);
    }
}

function limparFormulario(): void {
    editingTaskId = null;
    taskForm.reset();
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = Object.values(Status).find(value => value === selectStatus.value);
    const priority = Object.values(Priority).find(value => value === selectPriority.value);

    if (editingTaskId === null) {
        if (adicionarTarefa()) esconderCampos();
        return;
    }

    const title = inputTitle.value.trim();
    if (!validateTitle(title)) {
        alert("Digite um título válido.")
        inputTitle.focus();
        return;
    }

    const edit = taskList.editTask(
        editingTaskId,
        title,
        inputDescription.value,
        status,
        priority
    );

    if (!edit) return;
    salvarDados();
    renderTasks();
    limparFormulario();
    esconderCampos();
});

newTaskButton.addEventListener("click", () => {
    limparFormulario();
    mostrarCampos();
});
cancelButton.addEventListener("click", () => {
    limparFormulario();
    esconderCampos();
});
