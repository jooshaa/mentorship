const ApiError = require("../../helper/api.error");
const Student = require("../../models/student");
const JwtService = require('../../utils/jwt');

//patch blan delete
function selfCheck(req, res, next) {
    try{
        const {id} = req.params
        const authHeader = req.headers.authorization;
        if (!authHeader) throw ApiError.unauthorized("token not found ");

        const token = authHeader.split(" ")[1];
        const body = JwtService.verifyToken(token);

        if(!body || body.id !== Number(id) || body.is_creator || body.role=="admin"){
            throw ApiError.forbidden('You are not allowed')
        }
        next()

    }
    catch(error){
        next(error)
    }


}