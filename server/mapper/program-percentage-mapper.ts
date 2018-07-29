import { ProgramPercentage } from "../models/program-percentage";

export class ProgramPercentageMapper {
    public static mapData(data: ProgramPercentage): ProgramPercentage {

        let programPercentageData = new ProgramPercentage();
        programPercentageData.education = data.education;
        programPercentageData.mathematics = data.mathematics;
        programPercentageData.business_Marketing = data.business_marketing;
        programPercentageData.communications_Technology = data.communications_technology;
        programPercentageData.language = data.language;
        programPercentageData.visual_Performing = data.visual_performing;
        programPercentageData.engineering_Technology = data.engineering_technology;


    }
}