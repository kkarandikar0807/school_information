import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());


/**
 * This API call will return the school information.
 * This includes the school name, website, city etc.
 */
app.get('/school', (req: any, res: any) => {
    console.log(req.query);
})


app.listen(4000, () => {
    console.log("Running on port 4000");
})