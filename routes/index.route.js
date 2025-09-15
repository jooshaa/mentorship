const router = require('express').Router()

const adminRouter = require('./admin.route')
const authRouter = require('./auth.route')

router.use('/admin', adminRouter)
router.use('/auth', authRouter)

module.exports = router