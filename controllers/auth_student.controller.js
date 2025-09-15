const { decode } = require("../helper/crypt")
const { errorMessage, successMessage } = require("../helper/send.Err_Suc")
const Otp = require("../models/otp")
const Student = require("../models/student")
const { hashPass, compareHash } = require("../utils/bcrypt")
const sendMail = require("../utils/nodemailer")
const { generate_otp, verify_otp } = require("../utils/otp_create_verify")
const newOtp = require("./otp.main")



const register = async (req, res) => {
    let values = {}
    values = req.body
    const { email, password, phone } = req.body


    try {
        const candidate = await Student.findOne({ where: { email } })
        if (candidate) {
            return errorMessage(res, "this user already exist", 400, "Validation error")
        }
        //otp) new otp degan joyga otvorb  
        newOtp(values)

        res.json({
            message: "code sent"
        })
    } catch (error) {
        errorMessage(res, error.message, 400, "Error in registration")
    }
}

const authentication = async (req, res) => {
    const { otp } = req.body

    const body = await Otp.findOne({ where: { otp } })
    if (!body) {
        return errorMessage(res,
            "Error",
            400,
            "Inccorrect or expired code")
    }
    const decodedValue = JSON.parse(await decode(body.encodedValue))
    const { password } = decodedValue
    //hash procedure
    const hashedPasswrod = hashPass(password)
    decodedValue.password = hashedPasswrod
    const newStudent = Student.create(decodedValue)
    successMessage(res, 201, "you are registered")
}

module.exports = {
    register,
    authentication
}