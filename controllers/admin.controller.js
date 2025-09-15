const { successMessage, errorMessage } = require('../helper/send.Err_Suc')
const Admin = require('../models/admin')



const addAdmin = async (req, res)=>{
    let values = []
    try{
        values = req.body
        const newAdmin = await Admin.create(values)

        successMessage(res, 201, 'Created', newAdmin)
    }catch(error){
        errorMessage(res, error, 400, "kot")
    }
}



module.exports = {
    addAdmin,
}

