const {Sequelize, DataTypes} = require('sequelize');

const Model = Sequelize.Model;

const sequelize = new Sequelize('poke','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connection successful.')
    })
    .catch(() => {
    });

    
    module.exports = {sequelize}