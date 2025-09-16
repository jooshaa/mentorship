const JwtService = require("../../utils/jwt");
const ApiError = require("../../helper/api.error");

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.unauthorized("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw ApiError.unauthorized("No token provided");
        }

        const user = JwtService.validateAccessToken(token);
        if (!user) {
            throw ApiError.unauthorized("Invalid token");
        }

        req.user = user; 
        next();
    } catch (err) {
        next(err);
    }
};