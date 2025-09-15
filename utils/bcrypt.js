const bcrypt  = require("bcrypt")
const config  = require("config")

const salt = config.get("salt")
function hashPass(pass) {
    console.log(pass, salt);
    
    return bcrypt.hashSync(pass, salt)
}


function compareHash(hashPass, newPass) {
    return bcrypt.compareSync(newPass, hashPass)
}

module.exports = {
    hashPass, 
    compareHash
}