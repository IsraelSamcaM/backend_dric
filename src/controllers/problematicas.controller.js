import { Problematica } from '../models/Problematica.js';
import { Carrera } from '../models/Carrera.js';
import { Municipio } from '../models/Municipio.js';

export const getProblematicas = async (req, res) => {
    try {
        const problematicas = await Problematica.findAll({
            include: [
                {
                model: Carrera
                },
                {
                model: Municipio
                }
            ]
        });
        res.json(problematicas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProblematica = async (req, res) => {
    try {
        const { id_problematica } = req.params;

        const problematica = await Problematica.findOne({ 
            where: { id_problematica },
            include:
                [
                    {
                        model: Carrera
                    },
                    {
                        model: Municipio
                    }
                ]
            });

        if (!problematica) return res.status(404).json({ message: "La Problematica no existe" });
        res.json(problematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createProblematica = async (req, res) => {
    const { planteamiento,causas,efectos,que,como,para_que,cuando,contacto,telefono,fecha,zona,id_municipio,id_carrera } = req.body;
        
    try {
        const newProblematica = await Problematica.create({ 
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
            municipio_id : id_municipio,
            carrera_id : id_carrera
         });
        res.json(newProblematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const updateProblematica = async (req, res) => {
    const { id_problematica } = req.params;
    const { planteamiento,causas,efectos,que,como,para_que,cuando,contacto,telefono,fecha,zona,id_municipio,id_carrera  } = req.body;

    try {
        const problematica = await Problematica.findOne({ where: { id_problematica } });

        if (!problematica) return res.status(404).json({ message: "La Problematica no existe" });

        await problematica.update({ 
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
            municipio_id : id_municipio,
            carrera_id : id_carrera
        });

        res.json(problematica);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const deleteProblematica = async (req, res) => {
    try {
        const { id_problematica } = req.params;
        await Problematica.destroy({ where: { id_problematica } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}