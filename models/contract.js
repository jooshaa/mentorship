const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')
const Student = require('./student')
const Course = require('./course')
const Mentor = require('./mentor')

const Contract = sequelize.define('contract', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    payment_type: {
        type: DataTypes.ENUM('cash', 'card'),
    },
    status: {
        type: DataTypes.ENUM("pending", 'active', "cancelled", "completed"),
        allowNull: false,
        defaultValue: 'pending'
    },

},
    {
        timestamps: true,
        freezeTableName: true
    })

Student.hasMany(Contract)
Contract.belongsTo(Student)

Course.hasMany(Contract)
Contract.belongsTo(Course)

Mentor.hasMany(Contract)
Contract.belongsTo(Mentor)


module.exports = Contract