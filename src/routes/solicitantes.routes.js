import { Router } from "express";
import {createSolicitante,
        deleteSolicitante,
        getSolicitante,
        getSolicitantes,
        updateSolicitante} from '../controllers/solicitantes.controller.js';

const router = Router();

router.get('/:tipo', getSolicitantes);
router.get('/:id_solicitante', getSolicitante);

router.post('/', createSolicitante);
router.put('/:id_solicitante', updateSolicitante);
router.delete('/:id_solicitante', deleteSolicitante);

export default router;
