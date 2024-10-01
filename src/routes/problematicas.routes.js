import { Router } from "express";
import {createProblematica,
        deleteProblematica,
        getProblematica,
        getProblematicas,
        updateProblematica,
        getTableProblematicas,
        updatePublishProblematica,
        getSolicitudes,
        getProblematicasUser
 } from '../controllers/problematicas.controller.js'
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = Router();
router.get('/tabla/', verifyToken, getTableProblematicas);
router.get('/registros/',verifyToken , getProblematicasUser);
router.get('/solicitudes/', verifyToken, getSolicitudes);
router.put('/publicacion/:id_problematica', verifyToken,updatePublishProblematica);


router.get('/',getProblematicas);
router.get('/:id_problematica', getProblematica);


router.post('/',verifyToken, createProblematica);
router.put('/:id_problematica', verifyToken ,updateProblematica);
router.delete('/:id_problematica', verifyToken,deleteProblematica);

export default router;