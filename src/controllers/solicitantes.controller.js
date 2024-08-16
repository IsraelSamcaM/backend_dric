import { where } from 'sequelize';
import { Solicitante } from '../models/Solicitante.js';

export const getSolicitantes = async (req, res) => {
    try {
        const solicitantes = await Solicitante.findAll({})
            res.json(solicitantes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTipoSolicitantes = async (req, res) => {
    try {
        const {tipo} = req.params;
        let solicitantes;
        if ( tipo == 'municipios'){
            solicitantes = await Solicitante.findAll({where: {tipo_solicitante: 'MUNICIPIO'}})
            res.json(solicitantes);
        }else if(tipo == 'instituciones'){
            solicitantes = await Solicitante.findAll({where: {tipo_solicitante: 'INSTITUCION'}})
            res.json(solicitantes);
        }else{
            return res.status(400).json({ message: 'El tipo no es válido' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSolicitante = async (req, res) => {
    try {
        const { id_solicitante } = req.params;
        const solicitante = await Solicitante.findOne({ where: { id_solicitante } });
        if (!solicitante) return res.status(404).json({ message: "El solicitante no existe" });
        res.json(solicitante);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createSolicitante = async (req, res) => {
    const { nombre_solicitante, nombre_corto_sigla, jurisdiccion, tipo_solicitante } = req.body;
    try {
        const newSolicitante = await Solicitante.create({ nombre_solicitante, nombre_corto_sigla, jurisdiccion, tipo_solicitante });
        res.json(newSolicitante);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateSolicitante = async (req, res) => {
    const { id_solicitante } = req.params; 
    const { nombre_solicitante, nombre_corto_sigla, jurisdiccion, tipo_solicitante} = req.body;
    
    try {
        const [updated] = await Solicitante.update(
            { nombre_solicitante, nombre_corto_sigla, jurisdiccion, tipo_solicitante },
            { where: { id_solicitante } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Solicitante no encontrado' });
        }

        const updatedSolicitante = await Solicitante.findByPk(id_solicitante);
        res.json(updatedSolicitante);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteSolicitante = async (req, res) => {
    try {
        const { id_solicitante } = req.params;
        await Solicitante.destroy({ where: { id_solicitante } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}