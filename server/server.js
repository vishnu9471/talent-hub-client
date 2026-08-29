// Load environment variables first
// import dotenv from "dotenv";

// // Load environment variables FIRST
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import videoRoutes from "./routes/videoRoutes.js";
// import playlistRoutes from "./routes/playlistRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import postRoutes from "./routes/postRoutes.js";

// // ======================================================
// // ENVIRONMENT CONFIGURATION
// // ======================================================

// console.log("======================================");
// console.log("🔧 Environment Configuration");
// console.log("======================================");

// console.log(
//   "MONGO_URI:",
//   process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "JWT_SECRET:",
//   process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "JWT_EXPIRES_IN:",
//   process.env.JWT_EXPIRES_IN || "1d"
// );

// console.log(
//   "GMAIL_USER:",
//   process.env.GMAIL_USER ? "✅ Loaded" : "❌ Missing"
// );

// console.log(
//   "GMAIL_PASS:",
//   process.env.GMAIL_PASS ? "✅ Loaded" : "❌ Missing"
// );

// console.log("======================================");

// // ======================================================
// // REQUIRED ENVIRONMENT VARIABLES
// // ======================================================

// if (!process.env.MONGO_URI) {
//   console.error("❌ MONGO_URI is missing.");
//   process.exit(1);
// }

// if (!process.env.JWT_SECRET) {
//   console.error("❌ JWT_SECRET is missing.");
//   console.error("👉 Check your server/.env file.");
//   process.exit(1);
// }

// // ======================================================
// // CREATE EXPRESS APP
// // ======================================================

// const app = express();

// const PORT = process.env.PORT || 5000;

// // ======================================================
// // TRUST PROXY
// // ======================================================

// app.set("trust proxy", 1);

// // ======================================================
// // CORS
// // ======================================================

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://talent-hub-client-five.vercel.app",
// ];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow Postman / server-to-server requests
//     if (!origin) {
//       return callback(null, true);
//     }

//     // Allow known frontend URLs
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     // Allow Vercel preview deployments
//     if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
//       return callback(null, true);
//     }

//     console.log("❌ CORS blocked:", origin);

//     return callback(new Error("Not allowed by CORS"));
//   },

//   credentials: true,

//   methods: [
//     "GET",
//     "POST",
//     "PUT",
//     "PATCH",
//     "DELETE",
//     "OPTIONS",
//   ],

//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//   ],
// };

// app.use(cors(corsOptions));

// // ======================================================
// // BODY PARSERS
// // ======================================================

// app.use(
//   express.json({
//     limit: "50mb",
//   })
// );

// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "50mb",
//   })
// );

// // ======================================================
// // COOKIE PARSER
// // ======================================================

// app.use(cookieParser());

// // ======================================================
// // REQUEST LOGGER
// // ======================================================

// app.use((req, res, next) => {
//   console.log(`📡 ${req.method} ${req.originalUrl}`);

//   if (req.headers.authorization) {
//     console.log("🔐 Authorization header: Present");
//   } else {
//     console.log("🔐 Authorization header: Missing");
//   }

//   next();
// });

// // ======================================================
// // CONNECT DATABASE
// // ======================================================

// connectDB();

// // ======================================================
// // ROUTES
// // ======================================================

// // Authentication
// app.use("/api/auth", authRoutes);

// // Videos
// app.use("/api/videos", videoRoutes);

// // Users
// app.use("/api/users", userRoutes);

// // Posts
// app.use("/api/posts", postRoutes);

// // Playlists
// app.use("/api/playlists", playlistRoutes);

// // ======================================================
// // ROOT HEALTH CHECK
// // ======================================================

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "TalentHub API is running...",
//   });
// });

// // ======================================================
// // API HEALTH CHECK
// // ======================================================

// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "TalentHub backend is healthy",
//     database: "MongoDB",
//     server: "Express",
//   });
// });

// // ======================================================
// // 404 HANDLER
// // ======================================================

// app.use((req, res) => {
//   console.log(
//     `❌ Route not found: ${req.method} ${req.originalUrl}`
//   );

//   res.status(404).json({
//     error: "Route not found",
//     path: req.originalUrl,
//   });
// });

// // ======================================================
// // GLOBAL ERROR HANDLER
// // ======================================================

// app.use((err, req, res, next) => {
//   console.error("======================================");
//   console.error("🔥 GLOBAL SERVER ERROR");
//   console.error("======================================");
//   console.error("Message:", err.message);
//   console.error("Stack:", err.stack);

//   if (err.message === "Not allowed by CORS") {
//     return res.status(403).json({
//       error: "CORS policy does not allow access from this origin.",
//     });
//   }

//   return res.status(500).json({
//     error: "Server error",
//     details:
//       process.env.NODE_ENV === "production"
//         ? undefined
//         : err.message,
//   });
// });

// // ======================================================
// // START SERVER
// // ======================================================

// app.listen(PORT, () => {
//   console.log("======================================");
//   console.log("🚀 TalentHub Server Started");
//   console.log("======================================");
//   console.log(`📡 Server running on port ${PORT}`);
//   console.log(`🌐 http://localhost:${PORT}`);
//   console.log(`❤️ Health: http://localhost:${PORT}/api/health`);
//   console.log("======================================");
// });



import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// ======================================================
// ENVIRONMENT CONFIGURATION
// ======================================================

console.log("======================================");
console.log("🔧 Environment Configuration");
console.log("======================================");

console.log(
  "MONGO_URI:",
  process.env.MONGO_URI ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "JWT_SECRET:",
  process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "JWT_EXPIRES_IN:",
  process.env.JWT_EXPIRES_IN || "1d"
);

console.log(
  "GMAIL_USER:",
  process.env.GMAIL_USER ? "✅ Loaded" : "❌ Missing"
);

console.log(
  "GMAIL_PASS:",
  process.env.GMAIL_PASS ? "✅ Loaded" : "❌ Missing"
);

console.log("======================================");

// ======================================================
// REQUIRED ENVIRONMENT VARIABLES
// ======================================================

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing.");
  process.exit(1);
}

// ======================================================
// CREATE EXPRESS APP
// ======================================================

const app = express();

const PORT = process.env.PORT || 5000;

// ======================================================
// TRUST PROXY
// ======================================================

app.set("trust proxy", 1);

// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "https://talent-hub-client-five.vercel.app",
];

// Allow Vercel preview deployments
const isVercelOrigin = (origin) => {
  return /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);
};

const corsOptions = {
  origin: (origin, callback) => {
    // Requests without Origin
    // e.g. Postman, curl, server-to-server
    if (!origin) {
      return callback(null, true);
    }

    // Exact allowed origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Vercel deployments
    if (isVercelOrigin(origin)) {
      return callback(null, true);
    }

    console.log("❌ CORS blocked:", origin);

    return callback(
      new Error(`CORS blocked origin: ${origin}`)
    );
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options("*", cors(corsOptions));

// ======================================================
// BODY PARSERS
// ======================================================

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// ======================================================
// COOKIE PARSER
// ======================================================

app.use(cookieParser());

// ======================================================
// REQUEST LOGGER
// ======================================================

app.use((req, res, next) => {
  console.log(
    `📡 ${req.method} ${req.originalUrl}`
  );

  console.log(
    "🌐 Origin:",
    req.headers.origin || "None"
  );

  if (req.headers.authorization) {
    console.log("🔐 Authorization: Present");
  } else {
    console.log("🔐 Authorization: Missing");
  }

  next();
});

// ======================================================
// ROUTES
// ======================================================

app.use("/api/auth", authRoutes);

app.use("/api/videos", videoRoutes);

app.use("/api/users", userRoutes);

app.use("/api/posts", postRoutes);

app.use("/api/playlists", playlistRoutes);

// ======================================================
// ROOT HEALTH CHECK
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TalentHub API is running...",
  });
});

// ======================================================
// API HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TalentHub backend is healthy",
    database: "MongoDB",
    server: "Express",
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  console.log(
    `❌ Route not found: ${req.method} ${req.originalUrl}`
  );

  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.originalUrl,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("======================================");
  console.error("🔥 GLOBAL SERVER ERROR");
  console.error("======================================");

  console.error("Message:", err.message);

  // CORS error
  if (err.message.startsWith("CORS blocked origin:")) {
    return res.status(403).json({
      success: false,
      error: "CORS policy does not allow this origin.",
    });
  }

  return res.status(500).json({
    success: false,
    error: "Server error",

    details:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.message,
  });
});

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    // Connect to MongoDB BEFORE starting the server
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log("======================================");
      console.log("🚀 TalentHub Server Started");
      console.log("======================================");

      console.log(
        `📡 Server running on port ${PORT}`
      );

      console.log(
        `🌐 Port binding: 0.0.0.0:${PORT}`
      );

      console.log(
        `❤️ Health: /api/health`
      );

      console.log("======================================");
    });
  } catch (error) {
    console.error(
      "❌ Server failed to start:",
      error.message
    );

    process.exit(1);
  }
};

startServer();