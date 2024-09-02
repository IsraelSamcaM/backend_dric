import { Sequelize } from 'sequelize';
import { Problematica } from '../models/Problematica.js';
import { Solicitante } from '../models/Solicitante.js';
import { Usuario } from '../models/Usuario.js';
import { Publicacion } from '../models/Publicacion.js';

export const getContador = async (req, res) => {
    try {
        const validadoFilter = { validado: true };

        const subQuery = Sequelize.literal(`
           ( 
            SELECT DISTINCT ON ("problematicaIdProblematica") "id_publicacion"
            FROM "publicaciones"
            ORDER BY "problematicaIdProblematica", "updatedAt" DESC
          )
        `);

        const countPublicaciones = (activo) => Publicacion.count({
            where: {
                id_publicacion: { [Sequelize.Op.in]: subQuery },
                activo
            },
            include: [{
                model: Problematica,
                where: validadoFilter
            }]
        });

        const [
            problematicasCount,
            publicadasCount,
            noPublicadasCount,
            entidadesCount,
            usuariosCount,
            institucionesCount,
            municipiosCount,
            activosCount,
            inactivosCount,
            solicitudesCount
        ] = await Promise.all([
            Problematica.count({ where: validadoFilter }),
            countPublicaciones(true),
            countPublicaciones(false),
            Solicitante.count(),
            Usuario.count(),
            Solicitante.count({ where: { tipo_solicitante: 'INSTITUCION' } }),
            Solicitante.count({ where: { tipo_solicitante: 'MUNICIPIO' } }),
            Usuario.count({ where: { disponible: true } }),
            Usuario.count({ where: { disponible: false } }),
            Problematica.count({ where: { validado: false } })
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
            solicitudes: solicitudesCount
        });
    } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
        res.status(500).json({ error: "Error al obtener los datos del dashboard" });
    }
};
