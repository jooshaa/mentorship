const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controllers/admin.controller')
const router = require('express').Router()

router.post("/", createAdmin)
router.get('/', getAllAdmins)
router.get('/:id', getAdminById)
router.patch('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)


module.exports = router