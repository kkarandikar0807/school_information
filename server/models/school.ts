export class School {
    private _schoolName: string;
    private _id: number;

    constructor() {
    }

    get schoolName(): string {
        return this._schoolName;
    }

    set schoolName(value: string) {
        this._schoolName = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}