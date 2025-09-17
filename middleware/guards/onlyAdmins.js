const ApiError = require("../../helper/api.error");


module.exports = function onlyAdmins(req, res, next) {
    if (!req.user) {
        throw ApiError.unauthorized("User not authenticated");
    }

    if (req.user.is_creator || req.user.role == "admin") {
        return next()
    }

    throw ApiError.forbidden("you are not a Admin");
}