import { expect, test } from "vitest";
import { Task } from "../models/Task.js";
import { TaskService } from "../service/TaskService.js";
import { Status } from "../models/Status.js";

test("adicionar tarefa", () => {
  const service = new TaskService();
  const task1 = new Task("Capacitação Asimov");
  const task2 = new Task("Prova de Telecom");
  service.addTask(task1);
  service.addTask(task2);

  expect(service.listTasks()).toEqual([task1, task2]);
});

test("encontrar tarefa por id", () => {
  const service = new TaskService();
  const task1 = new Task("Olhinhos ID");
  const task2 = new Task("Jogar Valorant");
  const task2ID = task2.id;
  service.addTask(task1);
  service.addTask(task2);

  expect(service.findById(task2ID)).toEqual(task2);
});

test("remover tarefa", () => {
  const service = new TaskService();
  const task1 = new Task("Passar sem sub em telecom");
  const task2 = new Task("Pau na máquina");
  service.addTask(task1);
  service.addTask(task2);
  service.removeTask(task1.id);

  expect(service.listTasks()).toEqual([task2]);
});

test("completar tarefa", () => {
  const service = new TaskService();
  const task = new Task("Completar tarefa", "", Status.IN_PROGRESS);
  service.addTask(task);
  service.completeTask(task.id);

  expect(service.findById(task.id)?.status).toBe(Status.COMPLETED);
});
