const addMinustesToDate = require("../helper/add_minutes")
const { successMessage, errorMessage } = require("../helper/send.Err_Suc")
const Otp = require("../models/otp")
const sendMail = require("../utils/nodemailer")
const { generate_otp } = require("../utils/otp_create_verify")
const cleanOtp = require("../helper/clean.otp")
const { encode } = require("../helper/crypt")



const newOtp = async (values) => {
    try {
        const now = new Date()
        const expiration_time = addMinustesToDate(now, 3)
        const otp = generate_otp()
        console.log(values);
        
        await sendMail(values.email, otp)
        const encodedValue = await encode(JSON.stringify(values))
        console.log(encodedValue);
                

        const newOtpRow = await Otp.create({ otp, expiration_time, encodedValue })
        cleanOtp(newOtpRow, expiration_time)

        console.log("code sent")
    //    return successMessage(res, 201, "Otp saved")
    }
    catch (error) {
        console.error(error)
    //    return errorMessage(res, error, 400, "error in saving otp")
    }
}

// const otp_verify = async (values)

module.exports = newOtp