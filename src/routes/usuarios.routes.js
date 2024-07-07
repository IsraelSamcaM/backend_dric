import { Router } from "express";
import {createUsuario, getUsuario, getUsuarios, 
        updateUsuario, deleteUsuario,validarUsuario} from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id_usuario', getUsuario);

router.post('/', createUsuario);
router.put('/:id_usuario', updateUsuario);
router.delete('/:id_usuario', deleteUsuario);

router.post('/validar-usuario',validarUsuario);



export default router;
