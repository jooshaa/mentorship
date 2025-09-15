const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')
const Student = require('./admin')
const Mentor = require('./mentor')
const Course = require('./course')

const Review = sequelize.define('review', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rate:{
        type: DataTypes.SMALLINT
    },
    opinion:{
        type: DataTypes.TEXT
    }

},
{
    timestamps: false,
    freezeTableName: true
})

Student.hasMany(Review)
Review.belongsTo(Student)

Mentor.hasMany(Review)
Review.belongsTo(Mentor)

Course.hasMany(Review)
Review.belongsTo(Course)


module.exports = Review

