import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    mongoDBName: process.env.DB_NAME || 'aichat',
    openaiApiKey: process.env.OPENSDK_API_KEY,
    deepseekApiKey: process.env.DEEPSEEK_API_KEY,
    maxMemoryLength: process.env.MAX_MEMORY_LENGTH || 10,
};
