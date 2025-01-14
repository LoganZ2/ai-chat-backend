import { createOpenAIConversation, getOpenAIConversations, getOpenAIConversation, fetchOpenAIResponse, deleteOpenAIConversation } from '../services/openaiService.js';

const createConversation = async (req, res) => {
    const { model, message } = req.body;
    if (!model) {
        return res.status(400).json({ success: false, message: 'Model is required' });
    }
    try {
        const response = await createOpenAIConversation(model, message);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getConversations = async (req, res) => {
    try {
        const response = await getOpenAIConversations();
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getConversation = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'id is required' });
    }
    try {
        const response = await getOpenAIConversation(id);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getResponse = async (req, res) => {
    const { id, model, message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }
    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }
    try {
        const response = await fetchOpenAIResponse(id, model, message);
        res.status(200).json({ status: 200, response });
    } catch (error) {
        const st = parseInt(error.message);
        res.sendStatus(st);
    }
};

const deleteConversation = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'id is required' });
    }
    try {
        await deleteOpenAIConversation(id);
        res.sendStatus(200);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}

export { createConversation, getConversations, getConversation, getResponse, deleteConversation };