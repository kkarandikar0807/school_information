export class School {
    constructor(
        public schoolName: String, 
        public schoolAlias: String, 
        public website: String,
        public city: String,
        public state: String,
        public zipCode: String
    ) {
        this.schoolName = schoolName;
        this.schoolAlias = schoolAlias;
        this.website = website;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}