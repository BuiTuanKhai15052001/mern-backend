const express = require("express");
const route = express.Router();
require("dotenv").config();

const { signAccessToken } = require("../helpers/jwt_service");
const verifyAccessToken = require("../middleware/verifyAccessToken");
const authController = require("../controllers/authController");

//@route GET /
//@desc check if user login
//@access PUBLIC

route.get("/", verifyAccessToken, authController.getById);

//@route POST /api/auth/register
//@desc register User
//@paccess public

route.post("/register", authController.register);

//@route POST /api/auth/login
//@desc register User
//@paccess public

route.post("/login", authController.login);

module.exports = route;
