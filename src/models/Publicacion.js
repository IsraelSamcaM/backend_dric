import {DataTypes, INTEGER} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Publicacion = sequelize.define('publicaciones',{
    id_publicacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

});