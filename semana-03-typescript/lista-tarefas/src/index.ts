import { Task} from "./models/Task.js";
import { Status } from "./models/Status.js";

const tarefa = new Task("Estudar")

console.log(tarefa.id);
console.log(tarefa.name);
console.log(tarefa.description);
console.log(tarefa.status);

// console.log(lista)