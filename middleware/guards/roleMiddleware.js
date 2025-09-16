const ApiError = require("../helper/api.error");

module.exports = function (roles = []) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden("Not enough rights"));
        }
        next();
    };
};