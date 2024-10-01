import { Usuario } from '../models/Usuario.js';
import { encryptPassword, comparePassword } from '../utilities/encryptHelper.js';
import { generateToken } from '../utilities/tokenHelper.js';


export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(
            {attributes: ['id_usuario', 'nombre_usuario', 'email_usuario', 'tipo_usuario']}
        );
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.userId, {
            attributes: ['id_usuario', 'nombre_usuario', 'email_usuario', 'tipo_usuario']
        });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { nombre_usuario, contrasenia_usuario, email_usuario, tipo_usuario } = req.body;
        const hashedPassword = await encryptPassword(contrasenia_usuario);
        const newUsuario = await Usuario.create({ nombre_usuario, contrasenia_usuario: hashedPassword, email_usuario, tipo_usuario });
        res.json(newUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { nombre_usuario, contrasenia_actual, nueva_contrasenia, email_usuario } = req.body;

        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) return res.status(404).json({ message: "User not found" });

        const validPassword = await comparePassword(contrasenia_actual, usuario.contrasenia_usuario);
        if (!validPassword) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        usuario.nombre_usuario = nombre_usuario || usuario.nombre_usuario;
        usuario.email_usuario = email_usuario || usuario.email_usuario;

        if (nueva_contrasenia) {
            usuario.contrasenia_usuario = await encryptPassword(nueva_contrasenia);
        }

        await usuario.save();

        res.json({ message: "User updated successfully", usuario });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
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
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePassword(contrasenia_usuario, usuario.contrasenia_usuario);
        if (!isMatch) {
            return res.status(404).json({ message: "Incorrect password" });
        }

        const token = generateToken(usuario.id_usuario);
        res.json({ auth: true, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};

