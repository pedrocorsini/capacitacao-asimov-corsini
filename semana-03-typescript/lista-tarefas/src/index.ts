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
const filterPriority = document.querySelector("#filterByPriority") as HTMLSelectElement;

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

function taskTimestamp(label: string, value: Date): HTMLParagraphElement {
    const line = document.createElement("p");
    const timestamp = document.createElement("time");
    const { date, time } = formatDate(value);
    timestamp.dateTime = value.toISOString();
    timestamp.textContent = `${date} às ${time}`;
    line.append(label + " ", timestamp);
    return line;
}

function renderTasks(): void {
    pendingList.replaceChildren();
    inProgressList.replaceChildren();
    completedList.replaceChildren();

    for (const task of filtrarPorPrioridade()) {
        const li = document.createElement("li");
        const title = document.createElement("h4");
        title.textContent = task.title;
        const priority = document.createElement("span");
        priority.className = "task-priority";
        priority.dataset.priority = task.priority;
        priority.textContent = `Prioridade ${task.priority.toLocaleLowerCase("pt-BR")}`;
        const header = document.createElement("div");
        header.className = "task-header";
        header.append(title, priority);
        li.append(header);

        if (task.description?.trim()) {
            const description = document.createElement("p");
            description.className = "task-description";
            description.textContent = task.description;
            li.append(description);
        }

        const dates = document.createElement("div");
        dates.className = "task-dates";
        dates.append(taskTimestamp("Criada em", task.createdOn));
        if (task.editedOn) {
            dates.append(taskTimestamp("Editada em", task.editedOn));
        }
        li.append(dates);

        if (task.status == "Pendente") pendingList.appendChild(li);
        if (task.status == "Em Andamento") inProgressList.appendChild(li);
        if (task.status == "Concluída") completedList.appendChild(li);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remover";
        removeButton.className = "remove-task";
        removeButton.addEventListener("click", () => removerTarefa(task.id));

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Editar";
        editButton.className = "edit-task";
        editButton.addEventListener("click", () => editarTarefa(task.id));

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.textContent = "Concluir";
        completeButton.className = "complete-task"
        completeButton.addEventListener("click", () => concluirTarefa(task.id));

        const actions = document.createElement("div");
        actions.className = "task-actions";
        if (task.status !== Status.COMPLETED) {
            actions.append(completeButton)
            li.appendChild(actions);
        }
        actions.append(editButton, removeButton);
        li.appendChild(actions);
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

function concluirTarefa(taskID: string): boolean {
    if (!taskList.completeTask(taskID)) return false;
    salvarDados();
    renderTasks();
    return true;
}

function filtrarPorPrioridade(): Task[] {
    const priority = Object.values(Priority).find(value => value === filterPriority.value);
    const tasks = priority === undefined ? taskList.listTasks() : taskList.filterByPriority(priority);
    return tasks;
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

let aberto = false;
newTaskButton.addEventListener("click", () => {
    if (!aberto) {
        limparFormulario();
        mostrarCampos();
        aberto = true;
    } else {
        esconderCampos();
        aberto = false;
    }
});

cancelButton.addEventListener("click", () => {
    limparFormulario();
    esconderCampos();
});

filterPriority.addEventListener("change", renderTasks);