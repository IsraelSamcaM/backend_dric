import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

import { studentCarreras } from '../utilities/dataUserEst/studentCarreras.js';

dotenv.config();

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Usuario.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({
                auth: false,
                message: 'User not found',
            });
        }

        req.userId = user.id_usuario; 
        req.userRole = user.tipo_usuario;

        //temporal
        const studentCareer = studentCarreras.find(carrera => carrera.id_usuario === user.id_usuario);
        if (studentCareer) {
            req.userCarreraId = studentCareer.id_carrera;
            req.userCarreraNombre = studentCareer.nombre_carrera;
        } //temporal
        
        next();
    } catch (error) {
        return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token',
        });
    }
};


