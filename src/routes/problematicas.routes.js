import { Router } from "express";
import {createProblematica,
        deleteProblematica,
        getProblematica,
        getProblematicas,
        updateProblematica } from '../controllers/problematicas.controller.js'

const router = Router();

router.get('/', getProblematicas);
router.get('/id_problematica', getProblematica);

router.post('/', createProblematica);
router.put('/id_problematica', updateProblematica);
router.delete('/id_problematica', deleteProblematica);

export default router;