// import React, { useState } from "react";
// import axios from "../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEnvelope, FaLock } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // ============================================
//   // HANDLE INPUT CHANGE
//   // ============================================
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ============================================
//   // HANDLE LOGIN
//   // ============================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const email = form.email.trim().toLowerCase();

//       console.log("📤 Sending login request:", {
//         email,
//       });

//       // ============================================
//       // LOGIN API
//       // ============================================
//       const res = await axios.post("/auth/login", {
//         email,
//         password: form.password,
//       });

//       console.log("📥 Login response:", res.data);

//       // ============================================
//       // CHECK TOKEN
//       // ============================================
//       if (!res.data?.token) {
//         console.error("❌ No token received from backend");

//         setError(
//           "Login failed: authentication token was not received."
//         );

//         return;
//       }

//       // ============================================
//       // SAVE TOKEN
//       // ============================================
//       localStorage.setItem("token", res.data.token);

//       // ============================================
//       // SAVE USER
//       // ============================================
//       if (res.data.user) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify(res.data.user)
//         );
//       }

//       // ============================================
//       // VERIFY STORAGE
//       // ============================================
//       console.log(
//         "🔐 Token saved:",
//         !!localStorage.getItem("token")
//       );

//       console.log(
//         "👤 User saved:",
//         localStorage.getItem("user")
//       );

//       // ============================================
//       // TELL NAVBAR THAT LOGIN HAS HAPPENED
//       // ============================================
//       window.dispatchEvent(new Event("authChanged"));

//       // ============================================
//       // SHOW SUCCESS POPUP
//       // ============================================
//       setShowSuccess(true);

//       // ============================================
//       // REDIRECT TO HOMEPAGE
//       // ============================================
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (err) {
//       console.error("🔥 Login error:", err);

//       console.error(
//         "Backend response:",
//         err.response?.data
//       );

//       setError(
//         err.response?.data?.error ||
//           err.response?.data?.message ||
//           "Invalid email or password."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ==========================================
//           LOGIN PAGE
//       ========================================== */}

//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">

//         <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

//           {/* ======================================
//               LEFT SECTION
//           ====================================== */}

//           <div className="md:w-1/2 p-10 flex flex-col justify-center">

//             <img
//               src="/logo.png"
//               alt="TalentHub Logo"
//               className="h-10 w-auto object-contain mb-4"
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />

//             <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
//               Welcome Back to TalentHub
//             </h2>

//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Sign in to continue your creative journey
//               with{" "}
//               <span className="font-semibold text-indigo-600">
//                 TalentHub
//               </span>
//               .
//             </p>

//             <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
//               <li>🎵 Learn from 500+ experts</li>
//               <li>🚀 Showcase your talent to the world</li>
//               <li>👥 Connect with 50,000+ creators</li>
//             </ul>
//           </div>

//           {/* ======================================
//               RIGHT SECTION
//           ====================================== */}

//           <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 px-10 py-8">

//             <h3 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-white">
//               Log In to Your Account
//             </h3>

//             <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
//               Access exclusive lessons and upload your talent
//             </p>

//             {/* ======================================
//                 ERROR MESSAGE
//             ====================================== */}

//             {error && (
//               <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-lg mb-4">
//                 {error}
//               </div>
//             )}

//             {/* ======================================
//                 LOGIN FORM
//             ====================================== */}

//             <form
//               className="space-y-4"
//               onSubmit={handleSubmit}
//             >

//               {/* EMAIL */}

//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Email
//                 </label>

//                 <div className="flex items-center border rounded-md px-3 bg-white dark:bg-gray-800 mt-1">

//                   <FaEnvelope className="text-gray-400 mr-2" />

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="you@example.com"
//                     className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                     autoComplete="email"
//                     required
//                   />

//                 </div>
//               </div>

//               {/* PASSWORD */}

//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Password
//                 </label>

//                 <div className="flex items-center border rounded-md px-3 bg-white dark:bg-gray-800 mt-1">

//                   <FaLock className="text-gray-400 mr-2" />

//                   <input
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                     autoComplete="current-password"
//                     required
//                   />

//                 </div>

//                 <p className="text-right text-sm mt-1">
//                   <Link
//                     to="/forgot-password"
//                     className="text-indigo-500 hover:underline"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </p>
//               </div>

//               {/* LOGIN BUTTON */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg transition duration-300 shadow-md ${
//                   loading
//                     ? "opacity-70 cursor-not-allowed"
//                     : "hover:scale-[1.02] hover:shadow-lg"
//                 }`}
//               >
//                 {loading ? "Logging in..." : "Log In"}
//               </button>

//               {/* REGISTER */}

//               <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
//                 Don't have an account?{" "}

//                 <Link
//                   to="/register"
//                   className="text-indigo-600 font-medium hover:underline"
//                 >
//                   Register
//                 </Link>
//               </p>

//             </form>
//           </div>
//         </div>
//       </div>

//       {/* ==========================================
//           SUCCESS POPUP
//       ========================================== */}

//       {showSuccess && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full mx-4 animate-[fadeIn_0.3s_ease-in-out]">

//             {/* SUCCESS ICON */}

//             <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">

//               <span className="text-4xl text-green-600">
//                 ✓
//               </span>

//             </div>

//             {/* TITLE */}

//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//               Successfully Login!
//             </h2>

//             {/* MESSAGE */}

//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Thank You for logging in to TalentHub.
//             </p>

//             {/* LOADING */}

//             <div className="flex justify-center">

//               <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

//             </div>

//             <p className="text-xs text-gray-400 mt-3">
//               Redirecting to homepage...
//             </p>

//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { FaEnvelope, FaLock } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // ============================================
//   // INPUT CHANGE
//   // ============================================

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ============================================
//   // SUCCESS LOGIN
//   // ============================================

//   const handleSuccessfulLogin = (data) => {
//     console.log("✅ Login data:", data);

//     if (!data?.token) {
//       console.error("❌ No token received");
//       setError("Login failed: authentication token was not received.");
//       return;
//     }

//     // Save JWT
//     localStorage.setItem("token", data.token);

//     // Save user
//     if (data.user) {
//       localStorage.setItem("user", JSON.stringify(data.user));
//     }

//     console.log("✅ Token saved");
//     console.log(
//       "🔐 Token exists:",
//       !!localStorage.getItem("token")
//     );

//     console.log("👤 User:", data.user);

//     // Show success popup
//     setShowSuccess(true);

//     // Redirect to homepage
//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   };

//   // ============================================
//   // NORMAL EMAIL/PASSWORD LOGIN
//   // ============================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       console.log("📤 Sending login request:", {
//         email: form.email,
//       });

//       const res = await axios.post("/auth/login", {
//         email: form.email.trim().toLowerCase(),
//         password: form.password,
//       });

//       console.log("📥 Login response:", res.data);

//       if (!res.data?.token) {
//         setError(
//           "Login failed: server did not return authentication token."
//         );
//         return;
//       }

//       handleSuccessfulLogin(res.data);
//     } catch (err) {
//       console.error("🔥 Login error:", err);

//       console.error(
//         "Backend response:",
//         err.response?.data
//       );

//       setError(
//         err.response?.data?.error ||
//           "Invalid email or password."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // GOOGLE LOGIN
//   // ============================================

//   const handleGoogleSuccess = async (credentialResponse) => {
//     setError("");
//     setLoading(true);

//     try {
//       console.log("🔵 Google login started");

//       if (!credentialResponse?.credential) {
//         setError("Google authentication failed.");
//         return;
//       }

//       const res = await axios.post("/auth/google", {
//         credential: credentialResponse.credential,
//       });

//       console.log("📥 Google login response:", res.data);

//       if (!res.data?.token) {
//         setError(
//           "Google login failed: server did not return authentication token."
//         );
//         return;
//       }

//       handleSuccessfulLogin(res.data);
//     } catch (err) {
//       console.error("🔥 Google login error:", err);

//       console.error(
//         "Google backend response:",
//         err.response?.data
//       );

//       setError(
//         err.response?.data?.error ||
//           "Google login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // GOOGLE LOGIN ERROR
//   // ============================================

//   const handleGoogleError = () => {
//     console.error("❌ Google Login Failed");

//     setError(
//       "Google login failed. Please try again."
//     );
//   };

//   // ============================================
//   // UI
//   // ============================================

//   return (
//     <>
//       {/* ==========================================
//           LOGIN PAGE
//       ========================================== */}

//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 px-4 py-10">

//         <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

//           {/* ======================================
//               LEFT SECTION
//           ====================================== */}

//           <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-purple-50">

//             <img
//               src="/logo.png"
//               alt="TalentHub Logo"
//               className="h-10 w-auto object-contain mb-6"
//             />

//             <h2 className="text-4xl font-bold mb-3 text-gray-800">
//               Welcome Back to TalentHub
//             </h2>

//             <p className="text-gray-600 mb-6 text-lg">
//               Sign in to continue your creative
//               journey with{" "}
//               <span className="font-semibold text-indigo-600">
//                 TalentHub
//               </span>
//               .
//             </p>

//             <ul className="text-gray-600 text-sm space-y-3">
//               <li>🎵 Learn from 500+ experts</li>
//               <li>🚀 Showcase your talent to the world</li>
//               <li>👥 Connect with 50,000+ creators</li>
//               <li>🎬 Upload and share your videos</li>
//               <li>📚 Explore exclusive learning content</li>
//             </ul>

//           </div>

//           {/* ======================================
//               RIGHT SECTION
//           ====================================== */}

//           <div className="md:w-1/2 bg-gray-50 px-8 sm:px-10 py-10">

//             <h3 className="text-3xl font-bold text-center mb-2 text-gray-800">
//               Log In to Your Account
//             </h3>

//             <p className="text-center text-sm text-gray-500 mb-7">
//               Access TalentHub and explore all features
//             </p>

//             {/* ==================================
//                 ERROR
//             ================================== */}

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">
//                 {error}
//               </div>
//             )}

//             {/* ==================================
//                 EMAIL LOGIN
//             ================================== */}

//             <form
//               className="space-y-5"
//               onSubmit={handleSubmit}
//             >

//               {/* EMAIL */}

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Email
//                 </label>

//                 <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

//                   <FaEnvelope className="text-gray-400 mr-2" />

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="you@example.com"
//                     className="w-full py-3 outline-none bg-transparent text-black"
//                     required
//                   />

//                 </div>
//               </div>

//               {/* PASSWORD */}

//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Password
//                 </label>

//                 <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

//                   <FaLock className="text-gray-400 mr-2" />

//                   <input
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     className="w-full py-3 outline-none bg-transparent text-black"
//                     required
//                   />

//                 </div>

//                 <p className="text-right text-sm mt-2">
//                   <Link
//                     to="/forgot-password"
//                     className="text-indigo-600 hover:underline"
//                   >
//                     Forgot Password?
//                   </Link>
//                 </p>
//               </div>

//               {/* LOGIN BUTTON */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md transition ${
//                   loading
//                     ? "opacity-70 cursor-not-allowed"
//                     : "hover:scale-[1.02] hover:shadow-lg"
//                 }`}
//               >
//                 {loading
//                   ? "Logging in..."
//                   : "Log In"}
//               </button>

//             </form>

//             {/* ==================================
//                 DIVIDER
//             ================================== */}

//             <div className="flex items-center my-7">
//               <div className="flex-1 h-px bg-gray-300"></div>

//               <span className="px-4 text-sm text-gray-500">
//                 OR CONTINUE WITH
//               </span>

//               <div className="flex-1 h-px bg-gray-300"></div>
//             </div>

//             {/* ==================================
//                 GOOGLE LOGIN
//             ================================== */}

//             <div className="flex justify-center">

//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={handleGoogleError}
//                 useOneTap={false}
//                 theme="outline"
//                 size="large"
//                 text="continue_with"
//                 shape="rectangular"
//                 width="350"
//               />

//             </div>

//             {/* ==================================
//                 REGISTER
//             ================================== */}

//             <p className="text-center text-sm text-gray-600 mt-7">

//               Don't have an account?{" "}

//               <Link
//                 to="/register"
//                 className="text-indigo-600 font-semibold hover:underline"
//               >
//                 Create Account
//               </Link>

//             </p>

//           </div>
//         </div>
//       </div>

//       {/* ==========================================
//           SUCCESS POPUP
//       ========================================== */}

//       {showSuccess && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

//           <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full mx-4 animate-[fadeIn_.3s_ease-out]">

//             {/* SUCCESS ICON */}

//             <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">

//               <span className="text-5xl text-green-600">
//                 ✓
//               </span>

//             </div>

//             {/* TITLE */}

//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Successfully Login!
//             </h2>

//             {/* MESSAGE */}

//             <p className="text-gray-600 mb-6">
//               Thank You for logging in to TalentHub.
//             </p>

//             {/* LOADING */}

//             <div className="flex justify-center">

//               <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

//             </div>

//             <p className="text-xs text-gray-400 mt-3">
//               Redirecting to homepage...
//             </p>

//           </div>

//         </div>
//       )}
//     </>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ============================================
  // INPUT CHANGE
  // ============================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // SUCCESS LOGIN
  // ============================================

  const handleSuccessfulLogin = (data) => {
    console.log("✅ Login data:", data);

    if (!data?.token) {
      console.error("❌ No token received");
      setError("Login failed: authentication token was not received.");
      return;
    }

    // Save JWT
    localStorage.setItem("token", data.token);

    // Save user
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    console.log("✅ Token saved");
    console.log(
      "🔐 Token exists:",
      !!localStorage.getItem("token")
    );

    console.log("👤 User:", data.user);

    // Show success popup
    setShowSuccess(true);

    // Redirect to homepage
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // ============================================
  // NORMAL EMAIL/PASSWORD LOGIN
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("📤 Sending login request:", {
        email: form.email,
      });

      const res = await axios.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("📥 Login response:", res.data);

      if (!res.data?.token) {
        setError(
          "Login failed: server did not return authentication token."
        );
        return;
      }

      handleSuccessfulLogin(res.data);
    } catch (err) {
      console.error("🔥 Login error:", err);

      console.error(
        "Backend response:",
        err.response?.data
      );

      setError(
        err.response?.data?.error ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // GOOGLE LOGIN
  // ============================================

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      console.log("🔵 Google login started");

      if (!credentialResponse?.credential) {
        setError("Google authentication failed.");
        return;
      }

      console.log("🔑 Google credential received");

      const res = await axios.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      console.log("📥 Google login response:", res.data);

      if (!res.data?.token) {
        setError(
          "Google login failed: server did not return authentication token."
        );
        return;
      }

      handleSuccessfulLogin(res.data);
    } catch (err) {
      console.error("🔥 Google login error:", err);

      console.error(
        "Google backend response:",
        err.response?.data
      );

      setError(
        err.response?.data?.error ||
          "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // GOOGLE LOGIN ERROR
  // ============================================

  const handleGoogleError = () => {
    console.error("❌ Google Login Failed");

    setError(
      "Google login failed. Please try again."
    );
  };

  // ============================================
  // UI
  // ============================================

  return (
    <>
      {/* ==========================================
          LOGIN PAGE
      ========================================== */}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 px-3 sm:px-4 py-6 sm:py-10">

        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* ======================================
              LEFT SECTION
          ====================================== */}

          <div className="hidden md:flex md:w-1/2 p-10 flex-col justify-center bg-gradient-to-br from-indigo-50 to-purple-50">

            <img
              src="/logo.png"
              alt="TalentHub Logo"
              className="h-10 w-auto object-contain mb-6"
            />

            <h2 className="text-4xl font-bold mb-3 text-gray-800">
              Welcome Back to TalentHub
            </h2>

            <p className="text-gray-600 mb-6 text-lg">
              Sign in to continue your creative
              journey with{" "}
              <span className="font-semibold text-indigo-600">
                TalentHub
              </span>
              .
            </p>

            <ul className="text-gray-600 text-sm space-y-3">
              <li>🎵 Learn from 500+ experts</li>
              <li>🚀 Showcase your talent to the world</li>
              <li>👥 Connect with 50,000+ creators</li>
              <li>🎬 Upload and share your videos</li>
              <li>📚 Explore exclusive learning content</li>
            </ul>

          </div>

          {/* ======================================
              RIGHT SECTION
          ====================================== */}

          <div className="w-full md:w-1/2 bg-gray-50 px-5 sm:px-8 md:px-10 py-7 sm:py-10">

            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
              Log In to Your Account
            </h3>

            <p className="text-center text-sm text-gray-500 mb-7">
              Access TalentHub and explore all features
            </p>

            {/* ==================================
                ERROR
            ================================== */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">
                {error}
              </div>
            )}

            {/* ==================================
                EMAIL LOGIN
            ================================== */}

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

                  <FaEnvelope className="text-gray-400 mr-2 flex-shrink-0" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full min-w-0 py-3 outline-none bg-transparent text-black"
                    required
                  />

                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

                  <FaLock className="text-gray-400 mr-2 flex-shrink-0" />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full min-w-0 py-3 outline-none bg-transparent text-black"
                    required
                  />

                </div>

                <p className="text-right text-sm mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </p>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md transition ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-lg"
                }`}
              >
                {loading
                  ? "Logging in..."
                  : "Log In"}
              </button>

            </form>

            {/* ==================================
                DIVIDER
            ================================== */}

            <div className="flex items-center my-7">

              <div className="flex-1 h-px bg-gray-300"></div>

              <span className="px-3 sm:px-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-px bg-gray-300"></div>

            </div>

            {/* ==================================
                GOOGLE LOGIN
            ================================== */}

            <div className="w-full flex justify-center overflow-hidden">

              <div className="w-full max-w-[350px] flex justify-center">

                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="350"
                />

              </div>

            </div>

            {/* ==================================
                REGISTER
            ================================== */}

            <p className="text-center text-sm text-gray-600 mt-7">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          SUCCESS POPUP
      ========================================== */}

      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center max-w-sm w-full animate-[fadeIn_.3s_ease-out]">

            {/* SUCCESS ICON */}

            <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">

              <span className="text-5xl text-green-600">
                ✓
              </span>

            </div>

            {/* TITLE */}

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Successfully Login!
            </h2>

            {/* MESSAGE */}

            <p className="text-gray-600 mb-6">
              Thank You for logging in to TalentHub.
            </p>

            {/* LOADING */}

            <div className="flex justify-center">

              <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

            </div>

            <p className="text-xs text-gray-400 mt-3">
              Redirecting to homepage...
            </p>

          </div>

        </div>
      )}
    </>
  );
};

export default Login;