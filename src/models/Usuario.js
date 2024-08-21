import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import bcrypt from 'bcrypt';
import { Problematica } from './Problematica.js';

export const Usuario = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING
    },
    contrasenia_usuario: {
        type: DataTypes.STRING
    },
    tipo_usuario: {
        type: DataTypes.STRING
    },
    email_usuario: {
        type: DataTypes.STRING
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    hooks: {
        // beforeValidate: (usuario, options) => {
        //     usuario.nombre_usuario = usuario.nombre_usuario.toUpperCase();
        // },
        beforeCreate: async (usuario, options) => {
            if (usuario.contrasenia_usuario) {
                const salt = await bcrypt.genSalt(10);
                usuario.contrasenia_usuario = await bcrypt.hash(usuario.contrasenia_usuario, salt);
            }
        },
        beforeUpdate: async (usuario, options) => {
            if (usuario.changed('contrasenia_usuario')) {
                const salt = await bcrypt.genSalt(10);
                usuario.contrasenia_usuario = await bcrypt.hash(usuario.contrasenia_usuario, salt);
            }
        }
    }
});

Usuario.hasMany(Problematica, {
    foreignKey: 'usuario_id',
    sourceKey: 'id_usuario'
});

Problematica.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    targetKey: 'id_usuario'
});
