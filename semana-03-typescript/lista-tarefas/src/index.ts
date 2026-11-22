import { Task} from "./models/Task.js";
import { Status } from "./models/Status.js";
import { TaskService } from "./service/TaskService.js";
import { formatDate } from "./service/Utilities.js";

const tarefa = new Task("Estudar")

// console.log(tarefa.id);
// console.log(tarefa.name);
// console.log(tarefa.description);
// console.log(tarefa.status);
// console.log(tarefa.createdOn);

tarefa.description = "Estudar IA"

const lista = new TaskService();
lista.addTask(tarefa);
console.log(formatDate(tarefa.createdOn));
// console.log(lista);
// console.log(lista.listLength());


