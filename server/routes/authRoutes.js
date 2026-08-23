// import express from "express";
// import { register, login ,forgotPassword ,verifyOTP ,resetPassword} from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// router.post("/forgot-password", forgotPassword);
// router.post("/verify-otp", verifyOTP);
// router.post("/reset-password", resetPassword);

// export default router;




import express from "express";

import {
  register,
  login,
  googleLogin,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ======================================================
// NORMAL AUTHENTICATION
// ======================================================

router.post("/register", register);

router.post("/login", login);

// ======================================================
// GOOGLE LOGIN / SIGN UP
// ======================================================

router.post("/google", googleLogin);

// ======================================================
// PASSWORD RESET
// ======================================================

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

export default router;