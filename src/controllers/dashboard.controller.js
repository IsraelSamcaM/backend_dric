import { Problematica } from '../models/Problematica.js';
import { Solicitante } from '../models/Solicitante.js';
import { Usuario } from '../models/Usuario.js';

export const getContador = async (req, res) => {
    try {
        const problematicasCount = await Problematica.count();
        const solicitudesCount = await Solicitante.count();
        const usuariosCount = await Usuario.count();

        res.json({
            problematicas: problematicasCount,
            solicitudes: solicitudesCount,
            usuarios: usuariosCount
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
