import {DataTypes, INTEGER} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Problematica } from './Problematica.js'


export const Solicitante = sequelize.define('solicitantes',{
    id_solicitante:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_solicitante:{
        type: DataTypes.STRING
    },
    nombre_corto_sigla:{
        type: DataTypes.STRING
    },
    juridiccion:{
        type: DataTypes.STRING
    },
    tipo_solicitante:{
        type: DataTypes.STRING
    }
},{
    timestamps: true,
    hooks: {
        beforeValidate: (municipio, options) => {
            municipio.nombre_solicitante = municipio.nombre_solicitante.toUpperCase();  
            municipio.nombre_corto_sigla = municipio.nombre_corto_sigla.toUpperCase();  
            municipio.juridiccion = municipio.juridiccion.toUpperCase();  
            municipio.tipo_solicitante = municipio.tipo_solicitante.toUpperCase();  
        }
    }
});

Solicitante.hasMany(Problematica,{
    foreignKey: 'solicitante_id',
    sourceKey: 'id_solicitante'
})

Problematica.belongsTo(Solicitante,{
    foreignKey: 'solicitante_id',
    targetId: 'id_solicitante'
})