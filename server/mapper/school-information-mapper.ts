import {SchoolInformation} from "../models/school-information";


export class SchoolInformationMapper {

    public static mapData(data: any): SchoolInformation {
        let schoolInfo = new SchoolInformation();
        schoolInfo.schoolName = data.name;
        schoolInfo.schoolAlias = data.schoolAlias;
        schoolInfo.website = data.school_url;
        schoolInfo.city = data.city;
        schoolInfo.state = data.state;
        schoolInfo.zipCode = data.zipCode;

        return schoolInfo;
    }
}