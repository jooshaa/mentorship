const { register, authentication, login, logout } = require('../controllers/auth_student.controller')
const validate = require('../middleware/validation/joi.validator')
const { registerSchema, loginSchema, otpSchema } = require('../validations/auth_mentor.validation')
const router = require('express').Router()


router.post("/register", validate(registerSchema), register)
router.post("/verify-otp", validate(otpSchema), authentication)
router.post("/login", validate(loginSchema), login)
router.post('/logout', logout)


module.exports = router