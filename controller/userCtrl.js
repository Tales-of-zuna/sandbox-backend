const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { find } = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");

//create user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("Hereglegch burtguulsen baina");
  }
});

//handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("Refresh token байхгүй байна");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({
    refreshToken,
  });
  if (!user) {
    throw new Error("Өгөгдлийн санд refresh token байхгүй байна");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Refresh token дээр нэг алдаа байна");
    } else {
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    }
  });
  res.json(user);
});

//logout function

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("Refresh token байхгүй байна");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({
    refreshToken,
  });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204); //forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  return res.sendStatus(204); //forbidden
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 168 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Hereglegchiin aldaa");
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get all users heseg
const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch {
    throw new Error(error);
  }
});

//neg hereglegch avah
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json(block);
    s;
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json(unblock);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
};
