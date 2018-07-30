import {SchoolInformation} from "../models/school-information";


export class SchoolInformationMapper {

    public static mapData(data: any): SchoolInformation {
        // console.log(data);
        let schoolInfo = new SchoolInformation();
        schoolInfo.schoolName = data.name;
        schoolInfo.schoolAlias = data.alias;
        schoolInfo.website = data.school_url;
        schoolInfo.city = data.city;
        schoolInfo.state = data.state;
        schoolInfo.zipCode = data.zip;

        return schoolInfo;
    }
}