const { successMessage, errorMessage } = require('../helper/send.Err_Suc')
const Admin = require("../models/admin");
const { hashPass, compareHash } = require("../utils/bcrypt");
const JwtService = require("../utils/jwt");


function getPayload(admin) {
  return { id: admin.id, email: admin.email, role: admin.role };
}
//create
const createAdmin = async (req, res) => {
  try {
    const { email, password, name, phone, role, is_creator } = req.body;

    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) return errorMessage(res, "Admin already exists", 409, "Validation error");

    const hashedPassword = hashPass(password);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
      name,
      phone,
      role,
      is_creator,
    });

    const tokens = JwtService.generateTokens(getPayload(newAdmin));
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 15*60*1000 });

    return successMessage(res, 201, "created", tokens.accessToken);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in creation");
  }
};
//login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return errorMessage(res, "Email or password wrong", 400, "Error in login");

    const valid = compareHash(admin.password, password);
    if (!valid) return errorMessage(res, "Email or password wrong", 400, "Error in login");

    const tokens = JwtService.generateTokens(getPayload(admin));
    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 15*60*1000 });

    return successMessage(res, 200, "Logged in", tokens.accessToken);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in logging");
  }
};

//get
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
    return successMessage(res, 200, "Admins", admins);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in getting ");
  }
};

// byID
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!admin) return errorMessage(res, "Admin not found", 404, "Not found");
    return successMessage(res, 200, "Admin found", admin);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in getting");
  }
};

//update
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) return errorMessage(res, "Not found", 404, "Not found");

    if (req.body.password) req.body.password = hashPass(req.body.password); //esli parol izmenili 

    await admin.update(req.body);
    return successMessage(res, 200, "updated", admin);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in updating");
  }
};

// delete
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) return errorMessage(res, "Not found", 404, "Not found");

    await admin.destroy();
    return successMessage(res, 200, " deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in deleting ");
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};