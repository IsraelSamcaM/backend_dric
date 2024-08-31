import { Problematica } from '../models/Problematica.js';
import { Solicitante } from '../models/Solicitante.js';
import { Usuario } from '../models/Usuario.js';
import { Publicacion } from '../models/Publicacion.js';

export const getContador = async (req, res) => {
    try {
        const [
            problematicasCount,
            entidadesCount,
            usuariosCount,
            publicadasCount,
            noPublicadasCount,
            institucionesCount,
            municipiosCount,
            activosCount,
            inactivosCount,
            solicitudesCount
        ] = await Promise.all([
            Problematica.count(),
            Solicitante.count(),
            Usuario.count(),
            Problematica.count({
                include: {
                    model: Publicacion,
                    where: { activo: true },
                    required: true
                }
            }),
            Problematica.count({
                include: {
                    model: Publicacion,
                    where: { activo: false },
                    required: true
                }
            }),
            Solicitante.count({ where: { tipo_solicitante: 'INSTITUCION' } }),
            Solicitante.count({ where: { tipo_solicitante: 'MUNICIPIO' } }),
            Usuario.count({ where: { disponible: true } }),
            Usuario.count({ where: { disponible: false } }),
            Problematica.count({where:{ validado: false }})
        ]);

        res.status(200).json({
            problematicas: problematicasCount,
            entidades: entidadesCount,
            usuarios: usuariosCount,
            publicadas: publicadasCount,
            noPublicadas: noPublicadasCount,
            instituciones: institucionesCount,
            municipios: municipiosCount,
            activos: activosCount,
            inactivos: inactivosCount,
           solicitudes:solicitudesCount
        });
    } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
        res.status(500).json({ error: "Error al obtener los datos del dashboard" });
    }
};
