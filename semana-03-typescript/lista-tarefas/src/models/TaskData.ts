import type { Priority } from "./Priority.js";
import type { Status } from "./Status.js";

export interface TaskData {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    createdOn: string;
    editedOn?: string;
}
