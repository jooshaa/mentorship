const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin } = require('../controllers/admin.controller')
const router = require('express').Router()
const validate = require('../middleware/validation/joi.validator')
const { adminLoginSchema, adminCreateSchema  } = require('../validations/admin.validation')





router.post("/",validate(adminCreateSchema), createAdmin)
router.post("/",validate(adminLoginSchema), loginAdmin)
router.get('/', getAllAdmins)
router.get('/:id', getAdminById)
router.patch('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)


module.exports = router