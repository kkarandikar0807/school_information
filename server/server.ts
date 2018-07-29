import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as httpRequest from 'request';
import { UrlConstants } from './constants/url-constants';
import { ProgramPercentageMapper } from './mapper/program-percentage-mapper';

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
            res.json(JSON.parse(body));
        }

    })
})

app.get('/schoolinformation', (req: any, res: any) => {
    schoolId = req.query.schoolId;
    httpRequest.get(`${UrlConstants.baseURL}?id=${schoolId}&api_key=${UrlConstants.api_Key}`, (error: any, response: any, body: any) => {

    });
});

app.post('/login', (req: any, res: any) => {
    console.log(req.body);
    res.json({
        gotData: true
    });
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

            res.json(bodyObject.results[0]["2015"].cost.net_price.public.by_income_level);
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

            res.json(bodyObject.results[0]["2015"].student.demographics.race_ethnicity);
        }
    });
});


app.listen(4000, () => {
    console.log("Running on port 4000");
})