import { Router } from "express";
import { getUsuario, getUsuarios,
        updateUsuario, deleteUsuario,
        loginUsuario,createUsuario
} from '../controllers/usuarios.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';


const router = Router();

router.get('/', verifyToken, isAdmin, getUsuarios);
router.get('/:id_usuario',verifyToken , getUsuario);

router.post('/register',verifyToken, isAdmin , createUsuario);
router.post('/login', loginUsuario);
router.get('/profile',verifyToken, getUsuario);

router.put('/:id_usuario', verifyToken, isAdmin, updateUsuario);
router.delete('/:id_usuario', verifyToken, isAdmin , deleteUsuario);

export default router;
