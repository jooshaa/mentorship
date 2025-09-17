const ApiError = require("../../helper/api.error");
const JwtService = require('../../utils/jwt');

//patch blan delete
module.exports = async function selfCheck(req, res, next) {
    try{
        const {id} = req.params
        const authHeader = req.headers.authorization;
        if (!authHeader) throw ApiError.unauthorized("token not found ");

        const token = authHeader.split(" ")[1];
        const body =await JwtService.verifyAccessToken(token);
        console.log(body, "==========");
        console.log(id);
        
        if(!body){
            throw ApiError.forbidden('You are not allowed')
        }
        if(body.is_creator){
           return next()
        }

        if(body.role == "admin" && body.id == Number(id)){
           return next()
        }
        throw ApiError.forbidden('You are not allowed')

        

    }
    catch(error){
        next(error)
    }


}