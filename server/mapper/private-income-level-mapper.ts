import { PrivateIncomeLevel } from "../models/private-income-level";

export class PrivateIncomeLevelMapper {
    public static mapData(data: any): PrivateIncomeLevel {
        let publicIncome = new PrivateIncomeLevel();
        publicIncome.zeroTo48000 = data["0-48000"];
        publicIncome.thirtyThousandAndOneTo75000 = data["30001-75000"];
        publicIncome.thirtyThousandAndOneTo48000 = data["30001-48000"];
        publicIncome.seventyFiveThousandPlus = data["75000-plus"];
        publicIncome.zeroTo30000 = data["0-30000"];
        publicIncome.seventyFiveThousandAndOneTo110000 = data["75001-110000"];
        publicIncome.fortyEightThousandAndOneTo75000 = data["48001-75000"];
        publicIncome.hundredAndTenThousandAndOnePlus = data["110001-plus"];

        return publicIncome;
    }
}