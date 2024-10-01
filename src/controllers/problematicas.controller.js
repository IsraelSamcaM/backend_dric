import { Problematica } from '../models/Problematica.js';
import { Carrera } from '../models/Carrera.js';
import { Auxiliar } from '../models/Auxiliar.js';
import { Solicitante } from '../models/Solicitante.js';
import { Publicacion } from '../models/Publicacion.js';
import { Usuario } from '../models/Usuario.js';

import dotenv from 'dotenv';
dotenv.config(); 

export const getProblematicas = async (req, res) => {
    try {
        const problematicas = await Problematica.findAll({
            where:{
                validado: true            },
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
                },
                {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre_usuario", "email_usuario"]
                }
            ],order: [
                ['updatedAt', 'DESC']
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
                contacto: problematica.contacto_cargo + ', ' + problematica.contacto_nombre,
                telefono: problematica.telefono ? problematica.telefono : "0",
                telefono_institucional: problematica.telefono_institucional,
                zona: problematica.zona,
                publicado: publication.createdAt,
                activo: publication.activo,
                validado: problematica.validado,
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                usuario: problematica.usuario,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
            };
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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
                    model: Publicacion
                },
                {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre_usuario", "email_usuario"]
                },
            ]
        });
        if (!problematica || !problematica.publicaciones.length) {
            return res.status(404).json({ message: "Problematica not found" });
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
            contacto: problematica.contacto_cargo + ', ' + problematica.contacto_nombre,
            telefono: problematica.telefono ? problematica.telefono : "0",
            telefono_institucional: problematica.telefono_institucional,
            zona: problematica.zona,
            publicado: publication ? publication.createdAt : null, 
            actualizado: problematica.updatedAt,
            creado: problematica.createdAt,
            usuario: problematica.usuario,
            solicitante_id: problematica.solicitante_id,
            solicitante: problematica.solicitante,
            carreras: carreras
        };

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTableProblematicas = async (req, res) => {
    if (req.userRole !== 'ADMINISTRADOR') {
        return res.status(403).json({
            auth: false,
            message: 'Access restricted to administrators only',
        });
    }
    try {
        const problematicas = await Problematica.findAll({
            where:{
                validado: true            },
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
                },
                {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre_usuario", "email_usuario"]
                },
            ], order: [
                ['updatedAt', 'DESC']
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
                contacto: problematica.contacto_cargo + ', ' + problematica.contacto_nombre,
                telefono: problematica.telefono ? problematica.telefono : "0",
                telefono_institucional: problematica.telefono_institucional,
                zona: problematica.zona,
                publicado: recentPublication.createdAt,
                activo: recentPublication.activo,
                validado: problematica.validado,
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                usuario: problematica.usuario,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
            };
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProblematica = async (req, res) => {
    const { titulo, planteamiento, causas, efectos, que, como, para_que, cuando, contacto_cargo, contacto_nombre,
        telefono, telefono_institucional, zona, id_solicitante, id_carrera, publicado } = req.body;

    const valid = req.userRole === 'ADMINISTRADOR';
    const userId = req.userId; 

    try {
        const newProblematica = await Problematica.create({
            titulo,
            planteamiento,
            causas,
            efectos,
            que,
            como,
            para_que,
            cuando,
            contacto_cargo,
            contacto_nombre,
            telefono,
            telefono_institucional,
            zona,
            validado: valid,
            disponible: valid,
            usuario_id: userId,
            solicitante_id: id_solicitante,
        });

        for (const carreraId of id_carrera) {
            await Auxiliar.create({
                problematicaIdProblematica: newProblematica.id_problematica,
                carrera_id: carreraId,
            });
        }

        const isPublicado = req.userRole === 'ENTIDAD' ? false : publicado;

        await Publicacion.create({
            problematicaIdProblematica: newProblematica.id_problematica,
            activo: isPublicado,
        });

        res.json(newProblematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { 
        titulo, planteamiento, causas, efectos, que, como, para_que, cuando, 
        contacto_cargo, contacto_nombre, telefono, telefono_institucional, zona, 
        id_solicitante, id_carrera 
    } = req.body;

    try {
        const problematica = await Problematica.findOne({ where: { id_problematica } });
        if (!problematica) return res.status(404).json({ message: "Problem not found" });

        if (req.userRole === 'ENTIDAD' && problematica.validado === true) {
            return res.status(403).json({ message: "You cannot edit a validated problem" });
        }

        await problematica.update({
            titulo, 
            planteamiento,
            causas,
            efectos,
            que,
            como,
            para_que,
            cuando,
            contacto_cargo,
            contacto_nombre,
            telefono,
            telefono_institucional,
            zona,
            solicitante_id: id_solicitante,
        });

        await Auxiliar.destroy({ where: { problematicaIdProblematica: id_problematica } });
        for (const carreraId of id_carrera) {
            await Auxiliar.create({
                problematicaIdProblematica: id_problematica,
                carrera_id: carreraId  
            });
        }

        if (req.userRole === 'ADMINISTRADOR' && problematica.validado === false) {
            await problematica.update({
                validado: true
            });
        }

        res.json(problematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProblematica = async (req, res) => {
    if (req.userRole !== 'ADMINISTRADOR') {
        return res.status(403).json({
            auth: false,
            message: 'Access restricted to administrators only',
        });
    }
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
};

export const updatePublishProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { publicado } = req.body;

    try {
        if (req.userRole !== 'ADMINISTRADOR') {
            return res.status(403).json({ message: "Access denied. Only administrators can update publications." });
        }

        const problematica = await Problematica.findByPk(id_problematica);
        if (!problematica) return res.status(404).json({ message: "Problem not found." });

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

        res.status(200).json({ message: "Publication updated successfully." });
        
    } catch (error) {
        console.error("Error updating the publication: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getSolicitudes = async (req, res) => {
    if (req.userRole !== 'ADMINISTRADOR') {
        return res.status(403).json({
            auth: false,
            message: 'Access restricted to administrators only',
        });
    }
    try {
        const problematicas = await Problematica.findAll({
            where:{
                validado: false,
            },
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
                        activo: false
                    }
                },
                {
                    model: Usuario,
                    attributes: ["id_usuario", "nombre_usuario", "email_usuario"]
                }
            ],order: [
                ['updatedAt', 'ASC']
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
                contacto: problematica.contacto_cargo + ', ' + problematica.contacto_nombre,
                telefono: problematica.telefono ? problematica.telefono : "0",
                telefono_institucional: problematica.telefono_institucional,
                zona: problematica.zona,
                publicado: publication.createdAt,
                activo: publication.activo,
                validado: problematica.validado,
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                usuario: problematica.usuario,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
            };
        });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProblematicasUser = async (req, res) => {
    if (req.userRole !== 'ENTIDAD') {
        return res.status(403).json({
            auth: false,
            message: 'Access restricted to entities only',
        });
    }

    try{
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
                    model: Publicacion
                },
                {
                    model: Usuario,
                    where: { id_usuario: req.userId },
                    attributes: ["id_usuario", "nombre_usuario", "email_usuario"]
                }
            ]
        });

        const result = problematicas.map(problematica => {
            const carreras = problematica.auxiliares.map(aux => aux.carrera);
            const publication = problematica.publicaciones[0];
            
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
                contacto: `${problematica.contacto_cargo}, ${problematica.contacto_cargo}`,
                telefono: problematica.telefono ? problematica.telefono : "0",
                telefono_institucional: problematica.telefono_institucional,
                zona: problematica.zona,
                validado: problematica.validado,
                publicado: publication ? publication.createdAt : null,
                actualizado: problematica.updatedAt,
                creado: problematica.createdAt,
                usuario: problematica.usuario,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras
            };
        });

        return res.json(result);
    } catch (error) {
        console.error('Error en getProblematicasUser:', error);
        return res.status(500).json({ message: error.message });
    }
};


