import { Auxiliar } from '../models/Auxiliar.js';
import { Usuario } from '../models/Usuario.js';
import {v4 as uuidv4 } from 'uuid'

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const auxiliares = await Auxiliar.findAll();
        console.log(auxiliares)
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const usuario = await Usuario.findOne({ where: { id_usuario } });
        if (!usuario) return res.status(404).json({ message: "El usuario no existe" });
        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createUsuario = async (req, res) => {
    const { nombre_usuario, contrasenia_usuario, email_usuario } = req.body;
    try {
        const newUsuario = await Usuario.create({ nombre_usuario, contrasenia_usuario, email_usuario });
        res.json(newUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUsuario = async (req, res) => {
    try {
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
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        await Usuario.destroy({ where: { id_usuario } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const validarUsuario = async (req, res) => {
    try {
        const { codsiss, contrasenia_usuario } = req.body;

        const usuario = await Usuario.findOne({
            where: {
                codsiss,
                contrasenia_usuario,
            },
        });

        if (!usuario) {
            return res.json({ estado: 'failed' });
        }
        const token = uuidv4();

        const usuarioFormateado = {
            estado: 'successful',
            usuario: {
                id_usuario: usuario.id_usuario,
                token,
                nombre_usuario: usuario.nombre_usuario,
                email_usuario: usuario.email_usuario,
                tipo_usuario: usuario.tipo_usuario,
                codsiss: usuario.codsiss,
                disponible: usuario.disponible,
                ci_usuario: usuario.ci_usuario,
                foto_usuario: usuario.foto_usuario,
            },
        };

        res.json(usuarioFormateado);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




