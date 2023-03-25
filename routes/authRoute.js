const express = require("express");
const router = express.Router();
const {
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
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
//2:18:17 odoo product hesgiig hiine
