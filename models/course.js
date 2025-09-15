const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const Course = sequelize.define('course', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(100)
    },
    duration:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    }

},
{
    timestamps: false,
    freezeTableName: true
})

module.exports = Course