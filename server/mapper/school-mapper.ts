import {School} from "../models/school";

export class SchoolMapper {
    public mapData(data: any) {
        let school = new School();
        school.schoolName = data["school.name"];
        school.id = data.id;
    }
}