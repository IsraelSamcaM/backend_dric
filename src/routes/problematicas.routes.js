import { Router } from "express";
import {createProblematica,
        deleteProblematica,
        getProblematica,
        getProblematicas,
        updateProblematica,
        getTableProblematicas,
        updatePublishProblematica
 } from '../controllers/problematicas.controller.js'

const router = Router();
router.get('/tabla/', getTableProblematicas);
router.put('/publicacion/:id_problematica', updatePublishProblematica);


router.get('/', getProblematicas);
router.get('/:id_problematica', getProblematica);


router.post('/', createProblematica);
router.put('/:id_problematica', updateProblematica);
router.delete('/:id_problematica', deleteProblematica);

export default router;