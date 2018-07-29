import { ProgramPercentage } from "../models/program-percentage";

export class ProgramPercentageMapper {
    public static mapData(data: any): ProgramPercentage {

        let programPercentageData = new ProgramPercentage();
        programPercentageData.education = data.education;
        programPercentageData.mathematics = data.mathematics;
        programPercentageData.business_Marketing = data.business_marketing;
        programPercentageData.communications_Technology = data.communications_technology;
        programPercentageData.language = data.language;
        programPercentageData.visual_Performing = data.visual_performing;
        programPercentageData.engineering_Technology = data.engineering_technology;
        programPercentageData.parks_Recreation_Fitness = data.parks_recreation_fitness;
        programPercentageData.agriculture = data.agriculture;
        programPercentageData.security_Law_Enforcement = data.security_law_enforcement;
        programPercentageData.computer = data.computer;
        programPercentageData.precision_Production = data.precision_production;
        programPercentageData.humanities = data.humanities;
        programPercentageData.library = data.library;
        programPercentageData.psychology = data.psychology;
        programPercentageData.social_Science = data.social_science;
        programPercentageData.legal = data.legal;
        programPercentageData.english = data.english;
        programPercentageData.construction = data.construction;
        programPercentageData.military = data.military;
        programPercentageData.communication = data.communication;
        programPercentageData.public_Administration_Social_Service = data.public_administration_social_service;
        programPercentageData.architecture = data.architecture;
        programPercentageData.ethnic_Cultural_Gender = data.ethnic_cultural_gender;
        programPercentageData.resources = data.resources;
        programPercentageData.health = data.health;
        programPercentageData.engineering = data.engineering;
        programPercentageData.history = data.history;
        programPercentageData.theology_Religious_Vocation = data.theology_religious_vocation;
        programPercentageData.transportation = data.transportation;
        programPercentageData.physical_Science = data.physical_science;
        programPercentageData.science_Technology = data.science_technology;
        programPercentageData.biological = data.biological;
        programPercentageData.family_Consumer_Science = data.family_consumer_science;
        programPercentageData.philosophy_Religious = data.philosophy_religious;
        programPercentageData.personal_Culinary = data.personal_culinary;
        programPercentageData.multidiscipline = data.multidiscipline;
        programPercentageData.mechanic_Repair_Technology = data.mechanic_repair_technology;

        return programPercentageData;
    }
}