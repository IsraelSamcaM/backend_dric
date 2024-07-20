import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { toDefaultValue } from 'sequelize/lib/utils';
import { Auxiliar } from './Auxiliar.js';

export const Problematica = sequelize.define('problematicas', {
    id_problematica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
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
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: true,
        DefaultValue: DataTypes.NOW
    },
    activo:{
        type: DataTypes.BOOLEAN,
        DefaultValue: true
    }
}, {
    timestamps: false,
    hooks: {
        beforeValidate: (problematica, options) => {
            problematica.planteamiento = problematica.planteamiento.toUpperCase();   
            problematica.titulo = problematica.titulo.toUpperCase();   
        }
    }
});

Problematica.hasMany(Auxiliar,{
    foreingKey: 'problematica_id',
    sourceKey: 'id_problematica'
})

Auxiliar.belongsTo(Problematica,{
    foreingKey: 'problematica_id',
    targetId: 'id_problematica'
})