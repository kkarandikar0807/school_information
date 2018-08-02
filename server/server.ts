import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as httpRequest from 'request';
import { UrlConstants } from './constants/url-constants';
import { ProgramPercentageMapper } from './mapper/program-percentage-mapper';
import { SchoolMapper } from './mapper/school-mapper';
import { School } from './models/school';
import { SchoolInformation } from './models/school-information';
import { SchoolInformationMapper } from './mapper/school-information-mapper';
import { RaceAndEthnicityMapper } from './mapper/race-and-ethnicity-mapper';
import { PublicIncomeLevel } from './models/public-income-level';
import { PublicIncomeLevelMapper } from './mapper/public-income-level-mapper';
import { MongoHelper } from './helpers/mongo-helper';
import { User } from './models/user';
import * as fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let schoolId: String = '';
/**
 * This API call will return all the schools with thier ID's.
 *
 */
app.get('/schools', (req: any, res: any) => {

    httpRequest.get(`${UrlConstants.baseURL}?fields=school.name,id&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {
        if (error) {
            res.json(error);
        } else {
            let dataJson = JSON.parse(body);
            let mappedData: School[] = SchoolMapper.mapData(dataJson);
            
            res.json(mappedData);
        }

    })
})

app.get('/schoolinformation', (req: any, res: any) => {
    schoolId = req.query.schoolId;
    
    httpRequest.get(`${UrlConstants.baseURL}?id=${schoolId}&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {
        if (error) {
            res.json(error);
        } else {
            let dataJson = JSON.parse(body);
            let mappedData: SchoolInformation = SchoolInformationMapper.mapData(dataJson.results[0].school, dataJson.results[0]["2015"].student.size);
            
            res.json(mappedData);
        }
    });
});

app.post('/login', (req: any, res: any) => {
    let user = new User(req.body.username, req.body.password);
    MongoHelper.checkLoginData(user).then(data => {
        res.json(data);
    }).catch(error => {
        res.json(error);
    }) 
});


/**
 * This API call will return the information about the programa offered by the college.
 */
app.get('/programpercentage', (req: any ,res: any) => {

    schoolId = req.query.schoolId;
    httpRequest.get(`${UrlConstants.baseURL}?id=${schoolId}&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {
        if (error) {
            res.json(error);
        } else {
            let bodyObject = JSON.parse(body);

            let mappedData = ProgramPercentageMapper.mapData(bodyObject.results[0]["2015"].academics.program_percentage);

            res.json(mappedData);
        }
    });

});


/**
 * This API call will return the information about the net price which is filtered by public income level.
 */
app.get('/publicincome', (req: any ,res: any) => {
    schoolId = req.query.schoolId;
    httpRequest.get(`${UrlConstants.baseURL}?id=${schoolId}&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {
        if (error) {
            res.json(error);
        } else {
            let bodyObject = JSON.parse(body);
            let mappedData: PublicIncomeLevel = PublicIncomeLevelMapper.mapData(bodyObject.results[0]["2015"].cost.net_price.public.by_income_level);
            res.json(mappedData);
        }
    });
});


/**
 * This API call will return the diversity of the students of a chosen college.
 */
app.get('/raceandethnicity', (req: any, res: any) => {
    schoolId = req.query.schoolId;
    httpRequest.get(`${UrlConstants.baseURL}?id=${schoolId}&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {
        if (error) {
            res.json(error);
        } else {
            let bodyObject = JSON.parse(body);
            let mappedData = RaceAndEthnicityMapper.mapData(bodyObject.results[0]["2015"].student.demographics.race_ethnicity);
            res.json(mappedData);
        }
    });
});

app.get('/users', (req: any, res: any) => {
    
    let users = [];

    MongoHelper.getData().then((data: any) => {
        
        res.json(data);
    }).catch((error: any) => {
        res.json(error);
    })
});

app.post('/users', (req: any, res: any) => {
    
    let user = new User(req.body.username, req.body.password);
    MongoHelper.addData(user).then(data => {
        res.json(data);
    }).catch(error => {
        res.json(error);
    })
});

app.put('/users', (req: any, res: any) => {
    
    let user = new User(req.body.username, req.body.password);
    MongoHelper.updateData(user).then(data => {
        res.json(data);
    }).catch(error => {
        res.json(error);
    })
});

app.delete('/users', (req: any, res: any) => {
    let username = req.body.user;
    MongoHelper.deleteData(username).then(data => {
        res.json(data);
    }).catch(error => {
        res.json(error);
    })
});


app.listen(process.env.PORT ||4000, () => {
    console.log("Running on port 4000");
})