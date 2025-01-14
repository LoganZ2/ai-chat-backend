import express from 'express';
import { createConversation, getConversations, getConversation, getResponse, deleteConversation } from '../controllers/deepseekDataController.js';

const router = express.Router();

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.post('/conversations/create', createConversation);
router.post('/conversations/response', getResponse);
router.delete('/conversations/:id', deleteConversation);

export default router;