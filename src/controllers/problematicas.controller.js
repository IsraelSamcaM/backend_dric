import { Problematica } from '../models/Problematica.js';
import { Carrera } from '../models/Carrera.js';
import { Auxiliar } from '../models/Auxiliar.js';
import { Solicitante } from '../models/Solicitante.js';
import { Publicacion } from '../models/Publicacion.js';
import { where } from 'sequelize';


// export const formatDate = (date) => {
//     return date
//         ? new Date(date).toLocaleDateString('es-ES', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric'
//         })
//         : null;
// };


export const getProblematicas = async (req, res) => {
    try {
        const problematicas = await Problematica.findAll({
            include: [
                {
                    model: Auxiliar,
                    include: [
                        {
                            model: Carrera
                        }
                    ]
                },
                {
                    model: Solicitante
                },
                {
                    model: Publicacion,
                    where:{
                        activo: true
                    }
                }
            ]
        });

        const result = problematicas.map(problematica => {

            const carreras = problematica.auxiliares.map(aux => aux.carrera);
            const publication = problematica.publicaciones[0]

            return {
                id_problematica: problematica.id_problematica,
                titulo: problematica.titulo,
                planteamiento: problematica.planteamiento,
                causas: problematica.causas,
                efectos: problematica.efectos,
                que: problematica.que,
                como: problematica.como,
                para_que: problematica.para_que,
                cuando: problematica.cuando,
                contacto: problematica.contacto,
                telefono: problematica.telefono,
                fecha: problematica.fecha,
                zona: problematica.zona,
                publicado: publication.createdAt,
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
                
            };
        });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export const getTableProblematicas = async (req, res) => {
    try {
        const problematicas = await Problematica.findAll({
            include: [
                {
                    model: Auxiliar,
                    include: [
                        {
                            model: Carrera
                        }
                    ]
                },
                {
                    model: Solicitante
                },
                {
                    model: Publicacion,
                }
            ]
        });

        const result = problematicas.map(problematica => {

            const carreras = problematica.auxiliares.map(aux => aux.carrera);

            const recentPublication = problematica.publicaciones.reduce((latest, publication) => {
                return publication.createdAt > latest.createdAt ? publication : latest;
            }, { createdAt: new Date(0), activo: false }); 

            return {
                id_problematica: problematica.id_problematica,
                titulo: problematica.titulo,
                planteamiento: problematica.planteamiento,
                causas: problematica.causas,
                efectos: problematica.efectos,
                que: problematica.que,
                como: problematica.como,
                para_que: problematica.para_que,
                cuando: problematica.cuando,
                contacto: problematica.contacto,
                telefono: problematica.telefono,
                //fecha: problematica.fecha,
                zona: problematica.zona,
                publicado: recentPublication.createdAt, 
                activo: recentPublication.activo, 
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
            };
        });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getProblematica = async (req, res) => {
    const { id_problematica } = req.params;

    try {
        const problematica = await Problematica.findOne({
            where: { id_problematica },
            include: [
                {
                    model: Auxiliar,
                    include: [
                        {
                            model: Carrera
                        }
                    ]
                },
                {
                    model: Solicitante
                },
                {
                    model: Publicacion,
                    where: {
                        activo: true
                    }
                }
            ]
        });

        if (!problematica || !problematica.publicaciones.length) {
            return res.status(404).json({ message: "Problematica not found or not published" });
        }

        const carreras = problematica.auxiliares.map(aux => aux.carrera);
        const publication = problematica.publicaciones[0]; 
        const result = {
            id_problematica: problematica.id_problematica,
            titulo: problematica.titulo,
            planteamiento: problematica.planteamiento,
            causas: problematica.causas,
            efectos: problematica.efectos,
            que: problematica.que,
            como: problematica.como,
            para_que: problematica.para_que,
            cuando: problematica.cuando,
            contacto: problematica.contacto,
            telefono: problematica.telefono,
            fecha: problematica.fecha,
            zona: problematica.zona,
            publicado: publication ? publication.createdAt : null, 
            actualizado: problematica.updatedAt,
            creado: problematica.createdAt,
            solicitante_id: problematica.solicitante_id,
            solicitante: problematica.solicitante,
            carreras: carreras
        };

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const createProblematica = async (req, res) => {
    const { titulo, planteamiento,causas,efectos,que,como,para_que,cuando,contacto,telefono,fecha,zona,
            id_solicitante, id_carrera } = req.body;
        
    try {
        const newProblematica = await Problematica.create({ 
            titulo,
            planteamiento,
            causas,
            efectos,
            que,como,
            para_que,
            cuando,
            contacto,
            telefono,
            fecha,
            zona,
            solicitante_id: id_solicitante,
        });

        for (const carreraId of id_carrera) {
            await Auxiliar.create({
                problematicaIdProblematica: newProblematica.id_problematica,
                carrera_id: carreraId  
            });
        }

        const p = false

        if (p){
            await Publicacion.create({
                problematicaIdProblematica: newProblematica.id_problematica,
                activo: true
            })
        }else{
            await Publicacion.create({
                problematicaIdProblematica: newProblematica.id_problematica,
                activo: false
            })
        }

        res.json(newProblematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { titulo, planteamiento,causas,efectos,que,como,para_que,cuando,contacto,telefono,fecha,zona,
        id_solicitante, id_carrera } = req.body;

    try {
        const problematica = await Problematica.findOne({ where: { id_problematica } });

        if (!problematica) return res.status(404).json({ message: "La Problematica no existe" });

        await problematica.update({
            titulo, 
            planteamiento,
            causas,
            efectos,
            que,como,
            para_que,
            cuando,
            contacto,
            telefono,
            fecha,
            zona,
            solicitante_id : id_solicitante,
        });

        await Auxiliar.destroy({
            where: {
                problematicaIdProblematica: id_problematica
            }
        });

        for (const carreraId of id_carrera) {
            await Auxiliar.create({
                problematicaIdProblematica: id_problematica,
                carrera_id: carreraId  
            });
        }

        res.json(problematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deleteProblematica = async (req, res) => {
    try {
        const { id_problematica } = req.params;

        await Auxiliar.destroy({
            where: {
                problematicaIdProblematica: id_problematica
            }
        });

        await Publicacion.destroy({
            where: {
                problematicaIdProblematica: id_problematica
            }
        });

        await Problematica.destroy({ where: { id_problematica } });
        
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePublishProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { publicado } = req.body;

    try {
        const problematica = await Problematica.findByPk(id_problematica);

        if (!problematica) return res.status(404).json({ message: "La Problematica no existe" });

        if (publicado) {
            await Publicacion.update(
                { activo: false },
                { where: { problematicaIdProblematica: id_problematica } }
            );

            await Publicacion.create({
                problematicaIdProblematica: id_problematica,
                activo: true,
            });
        } else {
            await Publicacion.update(
                { activo: false },
                { where: { problematicaIdProblematica: id_problematica } }
            );
        }

        res.status(200).json({ message: "Publicacion actualizada correctamente" });
        
    } catch (error) {
        console.error("Error al actualizar la publicacion: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
