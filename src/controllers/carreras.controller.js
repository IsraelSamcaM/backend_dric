import { Carrera } from '../models/Carrera.js';

export const getCarreras = async (req, res) => {
    try {
        const carreras = await Carrera.findAll();
        res.json(carreras);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCarrera = async (req, res) => {
    try {
        const { id_carrera } = req.params;
        const carrera = await Carrera.findOne({ where: { id_carrera } });
        if (!carrera) return res.status(404).json({ message: "La carrera no existe" });
        res.json(carrera);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCarrera = async (req, res) => {
    const { nombre_carrera, nombre_corto , facultad } = req.body;
    try {
        const newCarrera = await Carrera.create({ nombre_carrera, nombre_corto, facultad });
        res.json(newCarrera);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCarrera = async (req, res) => {
    const { id_carrera } = req.params; 
    const { nombre_carrera, nombre_corto, facultad } = req.body;
    
    try {
        const [updated] = await Carrera.update(
            { nombre_carrera, nombre_corto, facultad },
            { where: { id_carrera } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }

        const updatedCarrera = await Carrera.findByPk(id_carrera);
        res.json(updatedCarrera);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCarrera = async (req, res) => {
    try {
        const { id_carrera } = req.params;
        await Carrera.destroy({ where: { id_carrera } });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}