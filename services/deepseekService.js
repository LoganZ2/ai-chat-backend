import OpenAI from 'openai';
import { config } from '../config/config.js';
import { getDatabase } from '../database/mongoClient.js';
import { ObjectId } from 'mongodb';

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: config.deepseekApiKey,
});

const { maxMemoryLength } = config;
const collectionName = 'deepseek';

export const createDeepseekConversation = async (model, message) => {
    try {
        const db = getDatabase();
        const messages = [{
            role: "user",
            content: message,
        }];
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages,
        });
        messages.push(response.choices[0].message);

        const namer = [...messages];
        namer.push({
            role: "user",
            content: "give our conversation a name, less than 8 words, no quotation marks",
        });
    
        const namerResponse = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages: namer
        });
    
        const dataToInsert = {
            model: model,
            name: namerResponse.choices[0].message.content,
            messages: messages
        };
    
        await db.collection(collectionName).insertOne(dataToInsert);
        return dataToInsert;
    } catch(error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}


export const getDeepseekConversations = async () => {
    try {
        /**
         * @type {import('mongodb').Db}
         */
        const db = getDatabase();
        return await db.collection(collectionName).find({}, { projection: { name: 1 } }).toArray();
    } catch(error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const getDeepseekConversation = async (id) => {
    try {
        /**
         * @type {import('mongodb').Db}
         */
        const db = getDatabase();
        return await db.collection(collectionName).findOne({ _id: ObjectId.createFromHexString(id) });
    } catch(error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const fetchDeepseekResponse = async (id, model, message) => {
    try {
        const db = getDatabase();
        let conversation = await getDeepseekConversation(id);
        let messages = conversation.messages;
        messages.push({
            role: "user",
            content: message
        });
        const response = await openai.chat.completions.create({
            model: conversation.model,
            messages: messages,
        });
        messages.push(response.choices[0].message);
        if (messages.length > maxMemoryLength) {
            messages.shift();
        }
        const setObject = {
            messages: messages,
        };
        if (model) {
            setObject.model = model;    
        }
        await db.collection(collectionName).updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: setObject }
        );
        return response.choices[0].message.content;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message.slice(0, 3));
    }
};

export const deleteDeepseekConversation = async (id) => {
    try {
        /**
         * @type {import('mongodb').Db}
         */
        const db = getDatabase();
        return await db.collection(collectionName).deleteOne({ _id: ObjectId.createFromHexString(id) });
    } catch(error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
