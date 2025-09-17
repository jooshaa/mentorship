const ApiError = require("../../helper/api.error")


module.exports = function(err, req, res, next){
    console.log(1,err);
    
    if (err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    if (err instanceof SyntaxError){
        return res.status(400).json({message: err.message})
    }
    if (err instanceof TypeError){
        return res.status(500).json({message: err.message})
    }

    return res.status(500).json({message: "Internal server error"})
}