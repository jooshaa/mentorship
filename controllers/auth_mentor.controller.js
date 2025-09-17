const { decode } = require("../helper/crypt")
const { errorMessage, successMessage } = require("../helper/send.Err_Suc")
const Otp = require("../models/otp")
const Mentor = require("../models/mentor")
const { hashPass, compareHash } = require("../utils/bcrypt")
const JwtService = require('../utils/jwt')
const newOtp = require("./otp.main")
const config = require("config")

function getTokenPayload(user) {
    return { id: user.id, email: user.email, role: user.role }
}


const register = async (req, res) => {
    let values = {}
    values = req.body
    const { email, password, phone } = req.body


    try {
        const candidate = await Mentor.findOne({ where: { email } })
        if (candidate) {
            return errorMessage(res, "this user already exist", 409, "Validation error")
        }
        //otp) new otp degan joyga otvorb  
        await newOtp(values)

        return successMessage(res, 200, "Code sent")
    } catch (error) {
        errorMessage(res, error.message, 500, "Error in registration")
    }
}

const authentication = async (req, res) => {
    try {
        const { otp } = req.body

        const body = await Otp.findOne({ where: { otp } })
        if (!body) {
            return errorMessage(res,
                "Error",
                401,
                "Inccorrect or expired code")
        }
        const decodedValue = JSON.parse(await decode(body.encodedValue))
        const { password } = decodedValue
        //hash procedure
        const hashedPasswrod = hashPass(password)
        decodedValue.password = hashedPasswrod
        const newMentor = await Mentor.create(decodedValue)

        const payload = getTokenPayload(newMentor)

        //need return tokens access refresh
        const tokens = JwtService.generateTokens(payload)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
        })
        successMessage(res, 201, "you are registered", tokens.accessToken)
    } catch (error) {
        errorMessage(res, error, 500, "Error")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const body = await Mentor.findOne({ where: { email } })
        const unhashedPass = compareHash(body.password, password,)

        if (!body || !email || !password) {
            return errorMessage(res, "password or email wrong", 400, "Error in logging")
        }
        if (!unhashedPass) {
            return errorMessage(res, "password or email wrong", 404, "Error in logging")
        }
        if (email != body.email) {
            return errorMessage(res, "password or email wrong", 401, "Error in logging")
        }
        //not tested yet
        const payload = getTokenPayload(body)
        const tokens = JwtService.generateTokens(payload)

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
        })
        successMessage(res, 200, "you are logged", tokens.accessToken)
    }
    catch (error) {
        errorMessage(res, error, 500, error.message)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
        })
        return successMessage(res, 200, "You are logged out")
    } catch (error) {
        return errorMessage(res, error.message, 500, "Error in logout")
    }
}




module.exports = {
    register,
    authentication,
    login,
    logout
}




