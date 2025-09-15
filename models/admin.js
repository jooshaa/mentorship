const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Admin = sequelize.define('admin', {
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
    is_creator: {                       
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},
    {
        timestamps: true,
        freezeTableName: true
    })

module.exports = Admin