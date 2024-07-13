import { Municipio } from '../models/Municipio.js';

export const getMunicipios = async (req, res) => {
    try {
        const municipios = await Municipio.findAll();
        res.json(municipios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getMunicipio = async (req, res) => {
    try {
        const { id_municipio } = req.params;
        const municipio = await Municipio.findOne({ where: { id_municipio } });
        if (!municipio) return res.status(404).json({ message: "El municipio no existe" });
        res.json(municipio);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createMunicipio = async (req, res) => {
    const { nombre_municipio, departamento } = req.body;
    try {
        const newMunicipio = await Municipio.create({ nombre_municipio, departamento });
        res.json(newMunicipio);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateMunicipio = async (req, res) => {
    const { id_municipio } = req.params; 
    const { nombre_municipio, departamento } = req.body;
    
    try {
        const [updated] = await Municipio.update(
            { nombre_municipio, departamento },
            { where: { id_municipio } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Municipio no encontrado' });
        }

        const updatedMunicipio = await Municipio.findByPk(id_municipio);
        res.json(updatedMunicipio);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteMunicipio = async (req, res) => {
    try {
        const { id_municipio } = req.params;
        await Municipio.destroy({ where: { id_municipio } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}