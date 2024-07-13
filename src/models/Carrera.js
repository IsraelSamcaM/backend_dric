import {DataTypes, INTEGER} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Problematica } from './Problematica.js'


export const Carrera = sequelize.define('carreras',{
    id_carrera:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_carrera:{
        type: DataTypes.STRING
    },
    facultad:{
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    hooks: {
        beforeValidate: (carrera, options) => {
            carrera.nombre_carrera = carrera.nombre_carrera.toUpperCase();  
            carrera.facultad = carrera.facultad.toUpperCase();  
        }
    }
});

Carrera.hasMany(Problematica,{
    foreignKey: 'carrera_id',
    sourceKey: 'id_carrera'
})

Problematica.belongsTo(Carrera,{
    foreignKey: 'carrera_id',
    targetId: 'id_carrera'
})