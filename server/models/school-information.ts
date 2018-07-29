export class School {

    private _schoolName: String;
    private _schoolAlias: String;
    private _website: String;

    get schoolName(): String {
        return this._schoolName;
    }

    set schoolName(value: String) {
        this._schoolName = value;
    }

    get schoolAlias(): String {
        return this._schoolAlias;
    }

    set schoolAlias(value: String) {
        this._schoolAlias = value;
    }

    get website(): String {
        return this._website;
    }

    set website(value: String) {
        this._website = value;
    }

    get city(): String {
        return this._city;
    }

    set city(value: String) {
        this._city = value;
    }

    get state(): String {
        return this._state;
    }

    set state(value: String) {
        this._state = value;
    }

    get zipCode(): String {
        return this._zipCode;
    }

    set zipCode(value: String) {
        this._zipCode = value;
    }

    private _city: String;
    private _state: String;
    private _zipCode: String;

    constructor() {}
}
