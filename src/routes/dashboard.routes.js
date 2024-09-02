import { Router } from 'express';
import { getContador } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/contador', getContador);

export default router;
