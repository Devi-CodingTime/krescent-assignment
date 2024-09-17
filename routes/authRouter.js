import express from 'express';
const router = express.Router();
import { authenticate } from'../controller/authController.js';

router.post('/login', authenticate);

export default router;