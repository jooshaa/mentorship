
function errorMessage (res, error, status, message="Error") {
    res.status(status).send({
        error: error,
        message: message
    })
}


function successMessage (res, status=200, message="Success", data={}){
    res.status(status).json({
        data: data,
        message: message
    })
}


module.exports = {
    errorMessage, successMessage
}