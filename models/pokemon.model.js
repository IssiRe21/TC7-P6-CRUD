const {Sequelize, DataTypes} = require('sequelize');
const Model = Sequelize.Model;
const {sequelize} = require('./../config/db');

// Crear el modelo (tabla)
// Nombre del modelo debe ser con mayúscula al inicio
// en singular
// "Crear un modelo llamado Pokemon" / "tabla llamada pokemon"
class Pokemon extends Model {};

// Configurar al modelo / la tabla
Pokemon.init({
    // 1) Configurar sus campos / las columnas de la tabla

    // Agregar columna name
    name: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    type: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    level: {
        // INT
        type: DataTypes.INTEGER,
        // NON NULL (obligatorio)
        allowNull: false,
    },
}, {
    // 2) Información adicional para el modelo

    // Conexión (requerida)
    sequelize,
    // Renombrar tabla a minúsculas (opcional)
    modelName: 'pokemon',
});

// Exportar un objeto, que dentro tiene al modelo Game
module.exports = {Pokemon};

