import {PublicIncomeLevel} from "../models/public-income-level";

export class PublicIncomeLevelMapper {

    public static mapData(data: any): PublicIncomeLevel {
        let publicIncome = new PublicIncomeLevel();
        publicIncome.zeroTo48000 = data["0-48000"];
        publicIncome.thirtyThousandAndOneTo75000 = data["30001-75000"];
        publicIncome.thirtyThousandAndOneTo48000 = data["30001-48000"];
        publicIncome.seventyFiveThousandPlus = data["75000-plus"];
        publicIncome.zeroTo30000 = data["0-30000"];
        publicIncome.seventyFiveThousandAndOneTo110000 = data["75001-110000"];
        publicIncome.fortyEightThousandAndOneTo75000 = data["48001-75000"];
        publicIncome.hundredAndTenTousandAndOnePlus = data["110001-plus"];

        return publicIncome;
    }
}