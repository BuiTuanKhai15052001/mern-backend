const { userValidate } = require("../helpers/validation");
const User = require("../models/User");
const createError = require("http-errors");
const argon2 = require("argon2");
const { signAccessToken } = require("../helpers/jwt_service");


const getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.payload.userId).select("-password");
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const { error } = userValidate(req.body);

    if (error) {
      throw createError(error.details[0].message);
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm Password is not correct...",
      });
    }

    //check for exist user
    const isExists = await User.findOne({
      username: email,
    });
    if (isExists) {
      throw createError.Conflict(`Email is exists`);
    }

    const hashedPassword = await argon2.hash(password);

    const user = new User({
      username: email,
      password: hashedPassword,
    });
    //save user to db
    const saveUser = await user.save();

    return res.send({
      success: true,
      message: "Register success",
      saveUser,
      // accessToken
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = userValidate({ email, password });
    if (error) {
      throw createError(error.details[0].message);
    }

    const user = await User.findOne({
      username: email,
    });
    if (!user) {
      throw createError.NotFound("User is not register");
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password...",
      });
    }
    console.log(user.username);
    const accessToken = await signAccessToken(user._id);
    //Alll gooood
    res.json({
      success: true,
      message: "Login sucesss!!!",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getById,
  register,
  login,
};
