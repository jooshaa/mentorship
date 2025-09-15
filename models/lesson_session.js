const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Course = require('./course')
const Location = require('./location')
const Mentor = require('./mentor')

const L_Session = sequelize.define('l_session', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    start_time:{
        type: DataTypes.STRING(6)
    },
    end_time:{
        type: DataTypes.STRING(6)
    }
},
{
    timestamps: false,
    freezeTableName: true
})
Course.hasMany(L_Session)
L_Session.belongsTo(Course)

Location.hasMany(L_Session)
L_Session.belongsTo(Location)

Mentor.hasMany(L_Session)
L_Session.belongsTo(Mentor)


module.exports = Course