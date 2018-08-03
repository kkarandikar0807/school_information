# SCHOOL_INFORMATION

This repo contains both the front-end and the server folders.


# FRONT-END
To start the front-end, 
head to the front-end folder/edu-analytics.
You should be able to see a package.json file. Type `npm install`.
Make sure you are in the right path.

Once the noode modules are installed, run `npm start`.
The app will work locally on port 8080.

If you intend to use the server locally, you would need to make small changes to the UI code.

Head to frontend/edu-analytics/constants/url-constants.js,
and change

`export const SERVER_URL = 'http://localhost:{PORT_NUMBER}'`

# SERVER

Head to the server folder. 
You should be able to see the package.json file in this folder.
Run `npm install` and wait for the node modules to be downloaded.

Once this done, run `npm start`.
The application will run on port 4000.

To change some of the constants from the server: - 

`
app.listen(process.env.PORT ||4000, () => {
    console.log("Running on port 4000");
})`

Change 4000 to any port you like.

The server speaks to a mongo DB instance hosted on cloud.

You can run this app locally and use the same mongoDB instance hosted in the cloud, or you can use a local instance of MongoDB.

For that you need to install MongoDB.
You can head to `https://docs.mongodb.com/manual/installation/` and follow the steps.

If you want to use a local instance you would need to change some of the constants.

Head to the server/constants folder.
Open `database-constants.ts`.
To run mongo locally change the databaseConnectionURL to

`public static databaseConnectionUrl = 'mongodb://<username>:<password>@localhost:27017';`
  
If you havent set and username and password simply replace the above line with this: - 

`public static databaseConnectionUrl = 'mongodb://localhost:27017';`

Change the database name and collection names.
(PLEASE MAKE SURE THAT EVEN IF YOU KEEP THE DATABASE AND COLLECTION NAMES TO BE THE SAME, YOU NEED TO CREATE THESE IN YOUR LOCAL MONGODB)

This will make sure that the server and database are working locally.


# DATABASE

In order to login in the app, we need a username and a password.

The app assumes that there is one user called `admin` who is present in the database.

In case of local mongoDB,
please create a user like

`
    {
        "username": "admin",
        "password": "password"
    }
`






