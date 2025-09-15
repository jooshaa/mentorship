const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const Student = require('./student')
const Contract = require('./contract')

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    paid_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', "paid", "failed", "refunded"),
        allowNull: false,
        defaultValue: 'pending'
    },
    currency: {
        type: DataTypes.CHAR(3),
        defaultValue: "USD"
    }

},
    {
        timestamps: true,
        freezeTableName: true
    })

Student.hasMany(Payment)
Payment.belongsTo(Student)

Contract.hasMany(Payment)
Payment.belongsTo(Contract)


module.exports = Payment