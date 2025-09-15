const { register, authentication } = require('../controllers/auth_student.controller')
const router = require('express').Router()

router.post("/register", register)
router.post("/verify-otp", authentication)


module.exports = router