const router = require('express').Router()

const adminRouter = require('./admin.route')
const studentAuthRouter = require('./auth.route')
const mentorAuthRouter = require('./auth.route_mentor')
const studentRouter = require('./student.route')
const mentorRouter = require('./mentor.route')
const courseRouter = require('./course.route')
const locationRouter = require('./location.route')
const sessionRouter = require('./l_session.route')
const reviewRouter = require('./review.route')
const paymentRouter = require('./payment.route')
const contractRouter = require('./contract.route')

router.use('/admin', adminRouter)
router.use('/auth-student', studentAuthRouter)
router.use('/auth-mentor', mentorAuthRouter)
router.use('/student', studentRouter)
router.use('/mentor', mentorRouter)
router.use('/course', courseRouter)
router.use('/location', locationRouter)
router.use('/session', sessionRouter)
router.use('/review', reviewRouter)
router.use('/payment', paymentRouter)
router.use('/contract', contractRouter)



module.exports = router