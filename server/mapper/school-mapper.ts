import {School} from "../models/school";

export class SchoolMapper {
    public static mapData(data: any): School[] {
        
        let mappedData: School[] = [];
        for (let i=0; i<data.results.length; i++) {
            mappedData.push(new School(data.results[i]["school.name"], data.results[i].id))
        }
        
        return mappedData;
    }
}