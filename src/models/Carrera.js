import {DataTypes, INTEGER} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Problematica } from './Problematica.js'
import { Auxiliar } from './Auxiliar.js';


export const Carrera = sequelize.define('carreras',{
    id_carrera:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_carrera:{
        type: DataTypes.STRING
    },
    nombre_corto:{
        type: DataTypes.STRING
    },
    facultad:{
        type: DataTypes.STRING
    }
},{
    timestamps: true,
    hooks: {
        beforeValidate: (carrera, options) => {
            carrera.nombre_carrera = carrera.nombre_carrera.toUpperCase();  
            carrera.nombre_corto = carrera.nombre_corto.toUpperCase();  
            carrera.facultad = carrera.facultad.toUpperCase();  
        }
    }
});

Carrera.hasMany(Auxiliar,{
    foreignKey: 'carrera_id',
    sourceKey: 'id_carrera'
})

Auxiliar.belongsTo(Carrera,{
    foreignKey: 'carrera_id',
    targetId: 'id_carrera'
})