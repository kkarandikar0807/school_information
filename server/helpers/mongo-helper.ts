import { MongoClient } from 'mongodb';
import {Promise} from 'es6-promise'
import { DatabaseConstants } from '../constants/database-constants';
import { User } from '../models/user';

export class MongoHelper {
    constructor() {
        //connection
    }
    
    public static addData(user: User): Promise<any> {
        console.log(user);
        return new Promise((resolve: any, reject: any) => {
            MongoClient.connect(DatabaseConstants.databaseConnectionUrl, (error: any, client: any) => {
                if (error) {
                    reject(error);
                } else {
                    let db = client.db(DatabaseConstants.databaseName);
                    let collection = db.collection(DatabaseConstants.collectionName);

                    collection.insertOne({username: user.username, password: user.password}, (error: any, data: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                isDataStored: true
                            })
                        }
                    })
                }
                client.close();
            })
        })
    }
    public static updateData(user: User): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            MongoClient.connect(DatabaseConstants.databaseConnectionUrl, (error: any, client: any) => {
                if (error) {
                    reject(error);
                } else {
                    let db = client.db(DatabaseConstants.databaseName);
                    let collection = db.collection(DatabaseConstants.collectionName);

                    collection.updateOne({username: user.username}, {$set: {username: user.username, password: user.password}}, (error: any, data: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                isDataUpdated: true
                            })
                        }
                    });
                }
                client.close();
            })
        })
    }
    public static deleteData(username: String) {
        return new Promise((resolve: any, reject: any) => {
            MongoClient.connect(DatabaseConstants.databaseConnectionUrl, (error: any, client: any) => {
                if (error) {
                    reject(error);
                } else {
                    let db = client.db(DatabaseConstants.databaseName);
                    let collection = db.collection(DatabaseConstants.collectionName);

                    collection.deleteOne({username: username}, (error: any, data: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({
                                isDataDeleted: true
                            })
                        }
                    });
                }
                client.close();
            })
        })
    }
    
    
    public static getData(): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            MongoClient.connect(DatabaseConstants.databaseConnectionUrl, (error: any, client: any) => {
                if (error) {
                    reject(error);
                } else {
                    let db = client.db(DatabaseConstants.databaseName);
                    let collection  = db.collection(DatabaseConstants.collectionName);
        
                    collection.find({}).toArray((error: any, data: any) => {
                        if (error) {
                            return error;
                        }
                        resolve(data);
                    })
                }
                client.close();
            })
        })
    }

    public static checkLoginData(user: User): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            MongoClient.connect(DatabaseConstants.databaseConnectionUrl, (error: any, client: any) => {
                if (error) {
                    reject(error);
                } else {
                    let db = client.db(DatabaseConstants.databaseName);
                    let collection  = db.collection(DatabaseConstants.collectionName);
        
                    collection.findOne({$and: [
                        { username: user.username },
                        { password: user.password }
                      ]}, (error: any, data: any) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (data == null) {
                                reject({
                                    isLoggedIn: false
                                })
                            } else {
                                resolve({
                                    isLoggedIn: true
                                });
                            }
                            
                        }
                    })
                }
                client.close();
            })
        })
    }
}