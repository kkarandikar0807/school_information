import {RaceAndEthnicity} from "../models/race-and-ethnicity";

export class RaceAndEthnicityMapper {
    public static mapData(data: any): RaceAndEthnicity {
        let raceAndEthnicity = new RaceAndEthnicity();
        raceAndEthnicity.nhpi = data.nhpi;
        raceAndEthnicity.non_Resident_Alien = data.non_resident_alien;
        raceAndEthnicity.black_2000 = data.black_2000;
        raceAndEthnicity.aian_2000 = data.aian_2000;
        raceAndEthnicity.hispanic_Prior_2009 = data.hispanic_prior_2009;
        raceAndEthnicity.black = data.black;
        raceAndEthnicity.asian = data.asian;
        raceAndEthnicity.api_2000 = data.api_2000;
        raceAndEthnicity.hispanic_2000 = data.hispanic_2000;
        raceAndEthnicity.unknown_2000 = data.unknown_2000;
        raceAndEthnicity.unknown = data.unknown;
        raceAndEthnicity.white_Non_Hispanic = data.white_non_hispanic;
        raceAndEthnicity.black_Non_Hispanic = data.black_non_hispanic;
        raceAndEthnicity.asian_Pacific_Islander = data.asian_pacific_islander;
        raceAndEthnicity.white = data.white;
        raceAndEthnicity.two_Or_More = data.two_or_more;
        raceAndEthnicity.hispanic = data.hispanic;
        raceAndEthnicity.aian = data.aian;
        raceAndEthnicity.aian_Prior_2009 = data.aian_prior_2009;
        raceAndEthnicity.white_2000; data.white_2000;

        return raceAndEthnicity;
    }
}