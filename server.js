import app from './app.js';
import { config } from './config/config.js';
import { connectToDatabase } from './database/mongoClient.js';


const startServer = async () => {
    try {
        connectToDatabase();
        app.listen(config.port, () => {
            console.log(`Server running at http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

startServer();
