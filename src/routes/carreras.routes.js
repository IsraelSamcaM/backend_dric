import { Router } from "express";
import {createCarrera,
        deleteCarrera,
        getCarrera,
        getCarreras,
        updateCarrera} from '../controllers/carreras.controller.js';

const router = Router();

router.get('/', getCarreras);
router.get('/:id_carrera', getCarrera);

router.post('/', createCarrera);
router.put('/:id_carrera', updateCarrera);
router.delete('/:id_carrera', deleteCarrera);

export default router;
