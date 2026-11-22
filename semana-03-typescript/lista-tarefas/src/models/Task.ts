import { randomUUID } from "node:crypto";
import { Status } from "./Status.js";
import { validateTitle } from "../service/Utilities.js";

export class Task {
    private readonly _id: string;
    private _title: string;
    private _description?: string;
    private _status: Status;
    private readonly _createdOn: Date;

    constructor(title: string, description?: string, status: Status = Status.PENDING) {
        this._id = randomUUID();
        this._title = title;
        if(description !== undefined) this._description = description;
        this._status = status;  
        this._createdOn = new Date();
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        if(!validateTitle(title)) throw new Error("Título Inválido");
        this._title = title.trim();
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

    get createdOn(): Date{
        return this._createdOn;
    }
} 