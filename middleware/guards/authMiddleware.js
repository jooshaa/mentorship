const JwtService = require("../../utils/jwt");
const ApiError = require("../../helper/api.error");

module.exports =async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.unauthorized("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw ApiError.unauthorized("token not found");
        }

        const user = await JwtService.verifyAccessToken(token);
        if (!user) {
            throw ApiError.unauthorized("Invalid token");
        }

        req.user = user; // eto dlya togo chtobi postavit udobstva dlya sledushego
        console.log(user);
        
        next();
    } catch (err) {
        next(err);
    }
};