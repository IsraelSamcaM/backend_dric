import {DataTypes, INTEGER} from 'sequelize'
import { sequelize } from '../database/database.js'
import { Problematica } from './Problematica.js';



export const Usuario = sequelize.define('usuarios',{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario:{
        type: DataTypes.STRING
    },
    contrasenia_usuario:{
        type: DataTypes.STRING
    },
    email_usuario:{
        type: DataTypes.STRING
    },
    disponible:{
        type: DataTypes.BOOLEAN,
        defaultValue:true 
    }
},{
    timestamps: true,
    hooks: {
        beforeValidate: (usuario, options) => {
            usuario.nombre_usuario = usuario.nombre_usuario.toUpperCase();  
        }
    }
});

Usuario.hasMany(Problematica,{
    foreingKey: 'usuario_id',
    sourceKey: 'id_usuario'
})

Problematica.belongsTo(Usuario,{
    foreingKey: 'usuario_id',
    targetId: 'id_usuario'
})
