const Otp = require("../models/otp");

function cleanOtp(body = {}, expiration_time) {
    const delay = new Date(expiration_time).getTime() - Date.now();

    setTimeout(async () => {
        try {
            await Otp.destroy({ where: { id: body.id } });
            console.log(`OTP ${body.id} deleted (expired)`);

        } catch (error) {
            console.error("error in deleting", error);
        }
    }, delay)
}
// setInterval(()=>{
//     cleanOtp();
// }, 3 * 60 * 1000)




module.exports = cleanOtp