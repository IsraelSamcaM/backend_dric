import {DataTypes, INTEGER} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Problematica } from './Problematica.js'


export const Municipio = sequelize.define('municipios',{
    id_municipio:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_municipio:{
        type: DataTypes.STRING
    },
    departamento:{
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    hooks: {
        beforeValidate: (municipio, options) => {
            municipio.nombre_municipio = municipio.nombre_municipio.toUpperCase();  
            municipio.departamento = municipio.departamento.toUpperCase();  
        }
    }
});

Municipio.hasMany(Problematica,{
    foreignKey: 'municipio_id',
    sourceKey: 'id_municipio'
})

Problematica.belongsTo(Municipio,{
    foreignKey: 'municipio_id',
    targetId: 'id_municipio'
})