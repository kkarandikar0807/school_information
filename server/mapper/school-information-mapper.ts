import {SchoolInformation} from "../models/school-information";


export class SchoolInformationMapper {

    public static mapData(data: any, schoolSize: String): SchoolInformation {
        
        let schoolInfo = new SchoolInformation();
        schoolInfo.schoolName = data.name;
        schoolInfo.schoolAlias = data.alias;
        schoolInfo.website = data.school_url;
        schoolInfo.city = data.city;
        schoolInfo.state = data.state;
        schoolInfo.zipCode = data.zip;
        schoolInfo.size = schoolSize

        return schoolInfo;
    }
}