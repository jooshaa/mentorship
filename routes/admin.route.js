const { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin } = require('../controllers/admin.controller')
const router = require('express').Router()
const validate = require('../middleware/validation/joi.validator')
const { adminLoginSchema, adminCreateSchema  } = require('../validations/admin.validation')
const isCreator = require("../middleware/guards/creatorMiddleware")
const isVerified = require('../middleware/guards/authMiddleware')
const selfAdmin = require('../middleware/guards/admiSelf')



router.post("/",validate(adminCreateSchema), isVerified, isCreator, createAdmin)
router.post("/login",validate(adminLoginSchema), loginAdmin)//is_admin need virify body
router.get('/', isVerified, getAllAdmins)
router.get('/:id',isVerified, getAdminById)
router.patch('/:id',isVerified, selfAdmin, updateAdmin)
router.delete('/:id',isVerified, selfAdmin, deleteAdmin)


module.exports = router