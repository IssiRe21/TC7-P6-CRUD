const { Sequelize, DataTypes } = require('sequelize');
const Model = Sequelize.Model;
const { sequelize } = require('../config/db');

// Crear el modelo (tabla)
// Nombre del modelo debe ser con mayúscula al inicio
// en singular
// "Crear un modelo llamado Pokemon" / "tabla llamada pokemon"
class Notes extends Model { };

// Configurar al modelo / la tabla
Notes.init({
    // 1) Configurar sus campos / las columnas de la tabla

    // Agregar columna name
    name: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    content: {
        // VARCHAR
        type: DataTypes.STRING,
        // NON NULL (obligatorio)
        allowNull: false,
    },
    pokemonId: {
        // VARCHAR
        type: DataTypes.INTEGER,
        // NON NULL (obligatorio)
        allowNull: false,
    },
}, {
    // 2) Información adicional para el modelo

    // Conexión (requerida)
    sequelize,
    // Renombrar tabla a minúsculas (opcional)
    modelName: 'notes',
});

// Exportar un objeto, que dentro tiene al modelo Game
module.exports = { Notes };

