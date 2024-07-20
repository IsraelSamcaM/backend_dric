import { Problematica } from '../models/Problematica.js';
import { Carrera } from '../models/Carrera.js';
import { Auxiliar } from '../models/Auxiliar.js';
import { Solicitante } from '../models/Solicitante.js';

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
                }
            ]
        });

        const result = problematicas.map(problematica => {
    
            const carreras = problematica.auxiliares.map(aux => aux.carrera);

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
                fecha_registro: problematica.fecha_registro,
                activo: problematica.activo,
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
    try {
        const { id_problematica } = req.params;

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
                }
            ]
            });
            if (!problematica) return res.status(404).json({ message: "La Problematica no existe" });

            const carreras = problematica.auxiliares.map(aux => aux.carrera);
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
                fecha_registro: problematica.fecha_registro,
                activo: problematica.activo,
                solicitante_id: problematica.solicitante_id,
                solicitante: problematica.solicitante,
                carreras: carreras 
            };

       
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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
            fecha_registro: new Date() ,
            activo: true
        });

        for (const carreraId of id_carrera) {
            await Auxiliar.create({
                problematicaIdProblematica: newProblematica.id_problematica,
                carrera_id: carreraId  
            });
        }

        res.json(newProblematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { titulo, planteamiento,causas,efectos,que,como,para_que,cuando,contacto,
            telefono,fecha,zona, id_solicitante,id_carrera } = req.body;

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

        await Problematica.destroy({ where: { id_problematica } });
        
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}