// authController.js (ESM version for MongoDB + Mongoose)

// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// import User from "../models/User.js";
// import PasswordReset from "../models/PasswordReset.js";

// // ======================================================
// // JWT HELPER
// // ======================================================

// const getJWTSecret = () => {
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     console.error("❌ JWT_SECRET is missing from environment variables");
//     throw new Error("JWT_SECRET is missing");
//   }

//   return secret;
// };

// // ======================================================
// // REGISTER
// // ======================================================

// export const register = async (req, res) => {
//   console.log("📝 Registration request received");
//   console.log("📦 Request body:", req.body);

//   const { name, lastname, email, password } = req.body;

//   if (!name || !lastname || !email || !password) {
//     console.log("❌ Missing required fields");

//     return res.status(400).json({
//       error: "All fields are required.",
//     });
//   }

//   try {
//     // ------------------------------------------
//     // CHECK JWT SECRET BEFORE CREATING USER
//     // ------------------------------------------

//     const JWT_SECRET = getJWTSecret();

//     console.log("🔑 JWT_SECRET:", "✅ Loaded");

//     // ------------------------------------------
//     // CLEAN INPUT
//     // ------------------------------------------

//     const cleanName = name.trim();
//     const cleanLastname = lastname.trim();
//     const cleanEmail = email.toLowerCase().trim();

//     // ------------------------------------------
//     // CHECK EXISTING USER
//     // ------------------------------------------

//     console.log("🔍 Searching for existing user...");

//     const existingUser = await User.findOne({
//       email: cleanEmail,
//     });

//     console.log(
//       "🔍 Existing user result:",
//       existingUser ? "FOUND" : "NOT FOUND"
//     );

//     if (existingUser) {
//       return res.status(409).json({
//         error: "Email is already registered.",
//       });
//     }

//     // ------------------------------------------
//     // HASH PASSWORD
//     // ------------------------------------------

//     console.log("🔐 Hashing password...");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ------------------------------------------
//     // CREATE USER
//     // ------------------------------------------

//     console.log("👤 Creating user...");

//     const newUser = await User.create({
//       name: cleanName,
//       lastname: cleanLastname,
//       email: cleanEmail,
//       password: hashedPassword,
//     });

//     console.log("✅ User created:", newUser._id);

//     // ------------------------------------------
//     // CREATE JWT
//     // ------------------------------------------

//     console.log("🎟️ Creating JWT...");

//     const token = jwt.sign(
//       {
//         id: newUser._id,
//         email: newUser.email,
//       },
//       JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRES_IN || "1d",
//       }
//     );

//     console.log("✅ Registration completed successfully");

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       userId: newUser._id,
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         lastname: newUser.lastname,
//         email: newUser.email,
//       },
//     });
//   } catch (err) {
//     console.error("🔥 REGISTRATION ERROR");
//     console.error("Error name:", err.name);
//     console.error("Error message:", err.message);
//     console.error("Full error:", err);

//     return res.status(500).json({
//       error: "Server error during registration.",
//       details: err.message,
//     });
//   }
// };

// // ======================================================
// // LOGIN
// // ======================================================

// export const login = async (req, res) => {
//   console.log("🔐 Login request received");

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       error: "Email and password are required",
//     });
//   }

//   try {
//     const JWT_SECRET = getJWTSecret();

//     const cleanEmail = email.toLowerCase().trim();

//     console.log("🔍 Searching for user:", cleanEmail);

//     const user = await User.findOne({
//       email: cleanEmail,
//     });

//     if (!user) {
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     console.log("🔐 Checking password...");

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         error: "Invalid credentials",
//       });
//     }

//     console.log("🎟️ Creating login token...");

//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//       },
//       JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRES_IN || "1d",
//       }
//     );

//     console.log("✅ Login successful");

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         lastname: user.lastname,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error("🔥 LOGIN ERROR:", err);

//     return res.status(500).json({
//       error: "Server error during login",
//       details: err.message,
//     });
//   }
// };

// // ======================================================
// // FORGOT PASSWORD
// // ======================================================

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({
//       error: "Email is required",
//     });
//   }

//   try {
//     const cleanEmail = email.toLowerCase().trim();

//     const user = await User.findOne({
//       email: cleanEmail,
//     });

//     if (!user) {
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     // Generate 6 digit OTP
//     const otp = crypto.randomInt(100000, 1000000).toString();

//     const expiresAt = new Date(
//       Date.now() + 15 * 60 * 1000
//     );

//     await PasswordReset.create({
//       email: cleanEmail,
//       otp,
//       expiresAt,
//     });

//     // Check Gmail credentials
//     if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
//       console.error("❌ Gmail credentials are missing");

//       return res.status(500).json({
//         error: "Email service is not configured.",
//       });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.GMAIL_USER,
//       to: cleanEmail,
//       subject: "TalentHub Password Reset OTP",
//       text: `Your TalentHub password reset OTP is: ${otp}. This OTP is valid for 15 minutes.`,
//     });

//     console.log("📧 OTP sent to:", cleanEmail);

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent to your email",
//     });
//   } catch (err) {
//     console.error("🔥 Forgot password error:", err);

//     return res.status(500).json({
//       error: "Something went wrong while sending OTP.",
//       details: err.message,
//     });
//   }
// };

// // ======================================================
// // VERIFY OTP
// // ======================================================

// export const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({
//       error: "Email and OTP are required",
//     });
//   }

//   try {
//     const cleanEmail = email.toLowerCase().trim();

//     const resetRecord = await PasswordReset.findOne({
//       email: cleanEmail,
//       otp: otp.toString(),
//       expiresAt: {
//         $gt: new Date(),
//       },
//     }).sort({
//       createdAt: -1,
//     });

//     if (!resetRecord) {
//       return res.status(400).json({
//         error: "Invalid or expired OTP",
//       });
//     }

//     console.log("✅ OTP verified:", cleanEmail);

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//     });
//   } catch (err) {
//     console.error("🔥 Verify OTP error:", err);

//     return res.status(500).json({
//       error: "Server error during OTP verification",
//     });
//   }
// };

// // ======================================================
// // RESET PASSWORD
// // ======================================================

// export const resetPassword = async (req, res) => {
//   const { email, newPassword } = req.body;

//   if (!email || !newPassword) {
//     return res.status(400).json({
//       error: "Email and new password are required",
//     });
//   }

//   try {
//     const cleanEmail = email.toLowerCase().trim();

//     const hashedPassword = await bcrypt.hash(
//       newPassword,
//       10
//     );

//     const updatedUser = await User.findOneAndUpdate(
//       {
//         email: cleanEmail,
//       },
//       {
//         $set: {
//           password: hashedPassword,
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         error: "User not found",
//       });
//     }

//     // Remove used OTP records
//     await PasswordReset.deleteMany({
//       email: cleanEmail,
//     });

//     console.log("✅ Password updated:", cleanEmail);

//     return res.status(200).json({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (err) {
//     console.error("🔥 Reset password error:", err);

//     return res.status(500).json({
//       error: "Failed to update password",
//       details: err.message,
//     });
//   }
// };








import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import PasswordReset from "../models/PasswordReset.js";

// ======================================================
// GOOGLE CLIENT
// ======================================================

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// ======================================================
// JWT HELPER
// ======================================================

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(
      "❌ JWT_SECRET is missing from environment variables"
    );

    throw new Error("JWT_SECRET is missing");
  }

  return secret;
};

// ======================================================
// CREATE JWT
// ======================================================

const createJWT = (user) => {
  const JWT_SECRET = getJWTSecret();

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// ======================================================
// USER RESPONSE
// ======================================================

const getUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    profilePicture: user.profilePicture || "",
    authProvider: user.authProvider || "local",
  };
};

// ======================================================
// REGISTER
// ======================================================

export const register = async (req, res) => {
  console.log("📝 Registration request received");
  console.log("📦 Request body:", req.body);

  const {
    name,
    lastname,
    email,
    password,
  } = req.body;

  if (
    !name ||
    !lastname ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  try {
    const JWT_SECRET = getJWTSecret();

    console.log(
      "🔑 JWT_SECRET:",
      JWT_SECRET ? "✅ Loaded" : "❌ Missing"
    );

    const cleanName = name.trim();
    const cleanLastname = lastname.trim();
    const cleanEmail = email.toLowerCase().trim();

    // ------------------------------------------
    // CHECK EXISTING USER
    // ------------------------------------------

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email is already registered.",
      });
    }

    // ------------------------------------------
    // HASH PASSWORD
    // ------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // ------------------------------------------
    // CREATE USER
    // ------------------------------------------

    const newUser = await User.create({
      name: cleanName,
      lastname: cleanLastname,
      email: cleanEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    console.log(
      "✅ User created:",
      newUser._id
    );

    // ------------------------------------------
    // CREATE JWT
    // ------------------------------------------

    const token = createJWT(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
      token,
      user: getUserResponse(newUser),
    });
  } catch (err) {
    console.error(
      "🔥 REGISTRATION ERROR:",
      err
    );

    return res.status(500).json({
      error: "Server error during registration.",
      details: err.message,
    });
  }
};

// ======================================================
// NORMAL LOGIN
// ======================================================

export const login = async (req, res) => {
  console.log("🔐 Login request received");

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  try {
    const cleanEmail = email
      .toLowerCase()
      .trim();

    console.log(
      "🔍 Searching for user:",
      cleanEmail
    );

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Google account trying normal password login
    if (!user.password) {
      return res.status(400).json({
        error:
          "This account uses Google login. Please continue with Google.",
      });
    }

    // ------------------------------------------
    // CHECK PASSWORD
    // ------------------------------------------

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // ------------------------------------------
    // CREATE JWT
    // ------------------------------------------

    const token = createJWT(user);

    console.log("✅ Login successful");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: getUserResponse(user),
    });
  } catch (err) {
    console.error(
      "🔥 LOGIN ERROR:",
      err
    );

    return res.status(500).json({
      error: "Server error during login",
      details: err.message,
    });
  }
};

// ======================================================
// GOOGLE LOGIN
// POST /api/auth/google
// ======================================================

export const googleLogin = async (
  req,
  res
) => {
  console.log(
    "🔵 Google login request received"
  );

  const { credential } = req.body;

  // ------------------------------------------
  // CHECK GOOGLE TOKEN
  // ------------------------------------------

  if (!credential) {
    return res.status(400).json({
      error:
        "Google authentication credential is required.",
    });
  }

  // ------------------------------------------
  // CHECK GOOGLE CLIENT ID
  // ------------------------------------------

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error(
      "❌ GOOGLE_CLIENT_ID is missing"
    );

    return res.status(500).json({
      error:
        "Google authentication is not configured on the server.",
    });
  }

  try {
    // ------------------------------------------
    // VERIFY GOOGLE ID TOKEN
    // ------------------------------------------

    const ticket =
      await googleClient.verifyIdToken({
        idToken: credential,
        audience:
          process.env.GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        error:
          "Invalid Google authentication.",
      });
    }

    const {
      sub: googleId,
      email,
      email_verified,
      given_name,
      family_name,
      picture,
    } = payload;

    // ------------------------------------------
    // CHECK GOOGLE DATA
    // ------------------------------------------

    if (!email || !email_verified) {
      return res.status(401).json({
        error:
          "Google email could not be verified.",
      });
    }

    const cleanEmail =
      email.toLowerCase().trim();

    console.log(
      "✅ Google account verified:",
      cleanEmail
    );

    // ------------------------------------------
    // FIND USER
    // ------------------------------------------

    let user = await User.findOne({
      email: cleanEmail,
    });

    // ------------------------------------------
    // EXISTING USER
    // ------------------------------------------

    if (user) {
      console.log(
        "👤 Existing user found:",
        user.email
      );

      // Connect Google account to existing account
      if (!user.googleId) {
        user.googleId = googleId;
      }

      if (
        !user.profilePicture &&
        picture
      ) {
        user.profilePicture = picture;
      }

      if (!user.authProvider) {
        user.authProvider = "google";
      }

      await user.save();
    }

    // ------------------------------------------
    // CREATE NEW GOOGLE USER
    // ------------------------------------------

    else {
      console.log(
        "👤 Creating new Google user..."
      );

      user = await User.create({
        name:
          given_name ||
          "TalentHub",

        lastname:
          family_name ||
          "User",

        email: cleanEmail,

        password: null,

        googleId,

        profilePicture:
          picture || "",

        authProvider: "google",
      });

      console.log(
        "✅ Google user created:",
        user._id
      );
    }

    // ------------------------------------------
    // CREATE TALENTHUB JWT
    // ------------------------------------------

    const token = createJWT(user);

    console.log(
      "🎟️ TalentHub JWT created"
    );

    // ------------------------------------------
    // SEND RESPONSE
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Google login successful",

      token,

      user: getUserResponse(user),
    });
  } catch (err) {
    console.error(
      "🔥 GOOGLE LOGIN ERROR:",
      err
    );

    return res.status(401).json({
      error:
        "Google authentication failed.",
      details: err.message,
    });
  }
};

// ======================================================
// FORGOT PASSWORD
// ======================================================

export const forgotPassword = async (
  req,
  res
) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }

  try {
    const cleanEmail =
      email.toLowerCase().trim();

    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Google accounts don't have a password
    if (
      user.authProvider === "google" &&
      !user.password
    ) {
      return res.status(400).json({
        error:
          "This account uses Google login. Please login with Google.",
      });
    }

    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();

    const expiresAt = new Date(
      Date.now() +
        15 * 60 * 1000
    );

    await PasswordReset.create({
      email: cleanEmail,
      otp,
      expiresAt,
    });

    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_PASS
    ) {
      return res.status(500).json({
        error:
          "Email service is not configured.",
      });
    }

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:
            process.env.GMAIL_USER,
          pass:
            process.env.GMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from:
        process.env.GMAIL_USER,

      to: cleanEmail,

      subject:
        "TalentHub Password Reset OTP",

      text: `Your TalentHub password reset OTP is: ${otp}. This OTP is valid for 15 minutes.`,
    });

    return res.status(200).json({
      success: true,
      message:
        "OTP sent to your email",
    });
  } catch (err) {
    console.error(
      "🔥 Forgot password error:",
      err
    );

    return res.status(500).json({
      error:
        "Something went wrong while sending OTP.",
      details: err.message,
    });
  }
};

// ======================================================
// VERIFY OTP
// ======================================================

export const verifyOTP = async (
  req,
  res
) => {
  const {
    email,
    otp,
  } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      error:
        "Email and OTP are required",
    });
  }

  try {
    const cleanEmail =
      email.toLowerCase().trim();

    const resetRecord =
      await PasswordReset.findOne({
        email: cleanEmail,
        otp: otp.toString(),
        expiresAt: {
          $gt: new Date(),
        },
      }).sort({
        createdAt: -1,
      });

    if (!resetRecord) {
      return res.status(400).json({
        error:
          "Invalid or expired OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "OTP verified successfully",
    });
  } catch (err) {
    console.error(
      "🔥 Verify OTP error:",
      err
    );

    return res.status(500).json({
      error:
        "Server error during OTP verification",
    });
  }
};

// ======================================================
// RESET PASSWORD
// ======================================================

export const resetPassword = async (
  req,
  res
) => {
  const {
    email,
    newPassword,
  } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      error:
        "Email and new password are required",
    });
  }

  try {
    const cleanEmail =
      email.toLowerCase().trim();

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    const updatedUser =
      await User.findOneAndUpdate(
        {
          email: cleanEmail,
        },
        {
          $set: {
            password: hashedPassword,
            authProvider: "local",
          },
        },
        {
          new: true,
        }
      );

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await PasswordReset.deleteMany({
      email: cleanEmail,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (err) {
    console.error(
      "🔥 Reset password error:",
      err
    );

    return res.status(500).json({
      error:
        "Failed to update password",
      details: err.message,
    });
  }
};



