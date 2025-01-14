import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

let client;
let db;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(config.mongoUri);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(config.mongoDBName);
    }
    return db;
};

export const getDatabase = () => {
    if (!db) {
        throw new Error('Database not connected. Call connectToDatabase() first.');
    }
    return db;
};
