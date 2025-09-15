const { addAdmin } = require('../controllers/admin.controller')
const router = require('express').Router()

router.post("/", addAdmin)


module.exports = router