import { randomUUID } from "node:crypto";
import { Status } from "./Status.js";

export class Task {
    private readonly _id: string;
    private _name: string;
    private _description?: string;
    private _status: Status;

    constructor(name: string, status: Status = Status.PENDING, description?: string) {
        this._id = randomUUID();
        this._name = name;
        this._status = status;  
        if(description !== undefined) this._description = description;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get status(): Status{
        return this._status;
    }

    set status(status: Status){
        this._status = status;
    }

    get description(): string | undefined{
        return this._description;
    }

    set description(description: string | undefined) {
        if(description === undefined) delete this._description;
        else this._description = description;
    }
} 