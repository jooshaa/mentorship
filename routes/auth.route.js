const { register, authentication, login } = require('../controllers/auth_student.controller')
const router = require('express').Router()

router.post("/register", register)
router.post("/verify-otp", authentication)
router.post("/login", login)



module.exports = router