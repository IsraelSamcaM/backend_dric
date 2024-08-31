import { Router } from 'express';
import { getContador } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/contador', getContador);
//router.get('/contador/detalles', getDetalles);

export default router;
