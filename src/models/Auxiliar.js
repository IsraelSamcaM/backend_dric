import {DataTypes, INTEGER} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Auxiliar = sequelize.define('auxiliares',{
    id_auxiliar:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});