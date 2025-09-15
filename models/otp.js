const sequelize = require('../config/db')
const { DataTypes } = require('sequelize');

const Otp = sequelize.define('otp', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    otp: {
        type: DataTypes.STRING(10),
    },
    verified:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expiration_time:{
        type: DataTypes.DATE,
    },
    encodedValue: {
        type: DataTypes.STRING
    }

}

);


module.exports = Otp;