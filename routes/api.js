import express from 'express';
import openaiApiRouter from './openaiApi.js';
import deepseekApiRouter from './deepseekApi.js'

const router = express.Router();

router.use('/openai', openaiApiRouter);
router.use('/deepseek', deepseekApiRouter);

export default router;
