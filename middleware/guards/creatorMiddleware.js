const ApiError = require("../../helper/api.error");


module.exports = function isCreator(req, res, next) {
    if (!req.user) {
        throw ApiError.unauthorized("User not authenticated");
    }
    const {is_creator} = req.user
    console.log(req.user);
    console.log(is_creator);
    
    if (!req.user.is_creator) {
        throw ApiError.forbidden("you are not a Creator");
    }
    next()
}