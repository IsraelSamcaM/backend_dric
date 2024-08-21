import { Router } from "express";
import { getUsuario,  
        updateUsuario, deleteUsuario,
        loginUsuario
} from '../controllers/usuarios.controller.js';

const router = Router();

//router.get('/', getUsuarios);
//router.get('/:id_usuario', getUsuario);

//router.post('/register', createUsuario);
router.post('/login', loginUsuario);
router.get('/profile', getUsuario);

router.put('/:id_usuario', updateUsuario);
router.delete('/:id_usuario', deleteUsuario);

export default router;
