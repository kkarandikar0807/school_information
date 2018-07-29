export class PublicIncomeLevel {
    constructor(
        public zeroTo48000: number,
        public thirtyThousandAndOneTo75000: number,
        public thirtyThousandAndOneTo48000: number,
        public seventyFiveThousandPlus: number,
        public zeroTo30000: number,
        public thirtyThousandAndOneTo110000: number,
        public fortyEightThousandAndOneTo75000: number,
        public hundredAndTenTousandAndOnePlus: number
    ) {
        this.zeroTo48000 = zeroTo48000;
        this.thirtyThousandAndOneTo75000 = thirtyThousandAndOneTo75000;
        this.thirtyThousandAndOneTo48000 = thirtyThousandAndOneTo48000;
        this.seventyFiveThousandPlus = seventyFiveThousandPlus;
        this.zeroTo30000 = zeroTo30000;
        this.thirtyThousandAndOneTo110000 = thirtyThousandAndOneTo110000;
        this.fortyEightThousandAndOneTo75000 = fortyEightThousandAndOneTo75000;
        this.hundredAndTenTousandAndOnePlus = hundredAndTenTousandAndOnePlus;
    }
}