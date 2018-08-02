export class PrivateIncomeLevel {
    private _zeroTo48000: number;
    private _thirtyThousandAndOneTo75000: number;
    private _thirtyThousandAndOneTo48000: number;
    private _seventyFiveThousandPlus: number;
    private _zeroTo30000: number;
    private _seventyFiveThousandAndOneTo110000: number;
    private _fortyEightThousandAndOneTo75000: number;
    private _hundredAndTenThousandAndOnePlus: number;


    get zeroTo48000(): number {
        return this._zeroTo48000;
    }

    set zeroTo48000(value: number) {
        this._zeroTo48000 = value;
    }

    get thirtyThousandAndOneTo75000(): number {
        return this._thirtyThousandAndOneTo75000;
    }

    set thirtyThousandAndOneTo75000(value: number) {
        this._thirtyThousandAndOneTo75000 = value;
    }

    get thirtyThousandAndOneTo48000(): number {
        return this._thirtyThousandAndOneTo48000;
    }

    set thirtyThousandAndOneTo48000(value: number) {
        this._thirtyThousandAndOneTo48000 = value;
    }

    get seventyFiveThousandPlus(): number {
        return this._seventyFiveThousandPlus;
    }

    set seventyFiveThousandPlus(value: number) {
        this._seventyFiveThousandPlus = value;
    }

    get zeroTo30000(): number {
        return this._zeroTo30000;
    }

    set zeroTo30000(value: number) {
        this._zeroTo30000 = value;
    }

    get seventyFiveThousandAndOneTo110000(): number {
        return this._seventyFiveThousandAndOneTo110000;
    }

    set seventyFiveThousandAndOneTo110000(value: number) {
        this._seventyFiveThousandAndOneTo110000 = value;
    }

    get fortyEightThousandAndOneTo75000(): number {
        return this._fortyEightThousandAndOneTo75000;
    }

    set fortyEightThousandAndOneTo75000(value: number) {
        this._fortyEightThousandAndOneTo75000 = value;
    }

    get hundredAndTenThousandAndOnePlus(): number {
        return this._hundredAndTenThousandAndOnePlus;
    }

    set hundredAndTenThousandAndOnePlus(value: number) {
        this._hundredAndTenThousandAndOnePlus = value;
    }

    constructor() {}
}