import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Problematica = sequelize.define('problematicas', {
    id_problematica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    planteamiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    causas: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    efectos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    que: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    como: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    para_que: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cuando: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    zona: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jurisdiccion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate: (problematica, options) => {
            problematica.planteamiento = problematica.planteamiento.toUpperCase();   
        }
    }
});
