import { Router } from "express";
import {createProblematica,
        deleteProblematica,
        getProblematica,
        getProblematicas,
        updateProblematica,
        getTableProblematicas,
        updatePublishProblematica,
        getSolicitudes,
        verifyToken
 } from '../controllers/problematicas.controller.js'

const router = Router();
router.get('/tabla/', verifyToken, getTableProblematicas);
router.get('/solicitudes/', verifyToken, getSolicitudes);
router.put('/publicacion/:id_problematica', verifyToken,updatePublishProblematica);


router.get('/',getProblematicas);
router.get('/:id_problematica', getProblematica);


router.post('/', createProblematica);
router.put('/:id_problematica', verifyToken ,updateProblematica);
router.delete('/:id_problematica', verifyToken,deleteProblematica);

export default router;