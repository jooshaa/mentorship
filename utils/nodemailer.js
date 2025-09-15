const nodemailer = require('nodemailer')
const config = require('config')
console.log("here");


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.get("myEmail"),
        pass: config.get("myEmailPass")
    }
})

//  console.log( config.get("myEmail"));
//  console.log( config.get("myEmailPass"));
 

async function sendMail(to, otp) {
    try {
        
        const info = await transporter.sendMail({
            from: `"MyApp OTP" <${config.get("myEmail")}>`,//conflict
            to: to,
            subject: 'your OTP code 🔑',
            text: `Your code is: ${otp}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>Confirmation</h2>
          <p>your code:</p>
          <h1 style="color: #2d89ef;">${otp}</h1>
          <p>Code will be expired in 3 minutes.</p>
        </div>
      `
        })
        console.log("code is sent")
    } catch (error) {
        console.error("mail error",error)
        
    }
}


module.exports = sendMail