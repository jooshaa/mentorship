const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Location = sequelize.define('location', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    address:{}
})