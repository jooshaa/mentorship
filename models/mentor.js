const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Mentor = sequelize.define('mentor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(72),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(82),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        validate: {
            is: /^[0-9+\-() ]*$/i
        }
    },
    specialization: {        
        type: DataTypes.STRING(100),
        allowNull: true
    }
},
    {
        timestamps: true,
        freezeTableName: true
    })

module.exports = Mentor