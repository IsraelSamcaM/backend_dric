import { Auxiliar } from '../models/Auxiliar.js';
import { Usuario } from '../models/Usuario.js';

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); 

// export const getUsuarios = async (req, res) => {
//     try {
//         const usuarios = await Usuario.findAll();
//         res.json(usuarios);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const getUsuario = async (req, res) => {
    try {
        const token = req.headers['x-access-token']

        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Usuario.findByPk(
            decoded.id, 
            {attributes: ['id_usuario', 'nombre_usuario', 'email_usuario', 'tipo_usuario']} 
        );

        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const createUsuario = async (req, res) => {
//     try {
//         const { nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario } = req.body;
//         const newUsuario = await Usuario.create({ nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario });
//         res.json(newUsuario);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const updateUsuario = async (req, res) => {
    try {

        const token = req.headers['x-access-token']

        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            })
        }

        const { id_usuario } = req.params;
        const { nombre_usuario, contrasenia_usuario, email_usuario } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) return res.status(404).json({ message: "El usuario no existe" });

        usuario.nombre_usuario = nombre_usuario;
        usuario.contrasenia_usuario = contrasenia_usuario;
        usuario.email_usuario = email_usuario;

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {

        const token = req.headers['x-access-token']

        if(!token){
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            })
        }

        const { id_usuario } = req.params;
        await Usuario.destroy({ where: { id_usuario } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUsuario = async (req, res) => {
    const { nombre_usuario, contrasenia_usuario } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { nombre_usuario } });

        if (!usuario) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        const isMatch = await bcrypt.compare(contrasenia_usuario, usuario.contrasenia_usuario);

        if (!isMatch) {
            return res.status(404).json({ message: "Password incorrecto" });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ auth: true, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
