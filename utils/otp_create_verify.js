const { totp } = require('otplib')
const config = require('config')

function generate_otp() {
    const secret = config.get('otp_secret')
    const code = totp.generate(secret)
    
    return (code)
}

function verify_otp(code) {
    const secret = config.get('otp_secret')
    const isValid = totp.verify({ token: code, secret })
    console.log('check:', isValid)
}


module.exports = {
    generate_otp, 
    verify_otp
}