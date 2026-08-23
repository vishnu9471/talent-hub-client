// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import axios from "../services/api";

// const Register = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       console.log("📤 Sending registration data:", {
//         name: form.name,
//         lastname: form.lastname,
//         email: form.email,
//       });

//       const res = await axios.post("/auth/register", form);

//       console.log("✅ Registration successful:", res.data);

//       // Save token after successful registration
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//       }

//       alert("Registration successful!");

//       // Go to dashboard after registration
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("🔥 Registration error:", error);

//       console.error(
//         "Backend response:",
//         error.response?.data
//       );

//       const message =
//         error.response?.data?.details ||
//         error.response?.data?.error ||
//         error.message ||
//         "Registration failed";

//       setError(message);

//       alert(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">

//       <div className="max-w-6xl w-full mx-4 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">

//         {/* LEFT SECTION */}
//         <div className="md:w-1/2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 flex flex-col justify-center">

//           <h2 className="text-4xl font-extrabold mb-4">
//             Your Creative Journey Starts Here
//           </h2>

//           <p className="mb-6">
//             Join thousands of artists who are learning, sharing, and
//             getting discovered on <strong>TalentHub</strong>.
//           </p>

//           <ul className="space-y-2 text-sm">
//             <li>🎵 Access to 500+ expert tutorials</li>
//             <li>👥 Join a community of 50,000+ learners</li>
//             <li>✨ Get personalized recommendations</li>
//           </ul>

//         </div>

//         {/* RIGHT SECTION */}
//         <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 px-10 py-8">

//           <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
//             Welcome to TalentHub
//           </h3>

//           <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
//             Create your TalentHub account
//           </p>

//           {/* ERROR MESSAGE */}
//           {error && (
//             <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
//               {error}
//             </div>
//           )}

//           <form
//             className="space-y-4"
//             onSubmit={handleSubmit}
//           >

//             {/* NAME */}
//             <div className="flex gap-4">

//               <div className="w-1/2">

//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   First Name
//                 </label>

//                 <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">

//                   <FaUser className="text-gray-400 mr-2" />

//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="John"
//                     value={form.name}
//                     onChange={handleChange}
//                     className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                     required
//                   />

//                 </div>

//               </div>

//               {/* LAST NAME */}
//               <div className="w-1/2">

//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Last Name
//                 </label>

//                 <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">

//                   <FaUser className="text-gray-400 mr-2" />

//                   <input
//                     type="text"
//                     name="lastname"
//                     placeholder="Doe"
//                     value={form.lastname}
//                     onChange={handleChange}
//                     className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                     required
//                   />

//                 </div>

//               </div>

//             </div>

//             {/* EMAIL */}
//             <div>

//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email
//               </label>

//               <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">

//                 <FaEnvelope className="text-gray-400 mr-2" />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                   required
//                 />

//               </div>

//             </div>

//             {/* PASSWORD */}
//             <div>

//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>

//               <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">

//                 <FaLock className="text-gray-400 mr-2" />

//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Create a password"
//                   value={form.password}
//                   onChange={handleChange}
//                   className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
//                   required
//                   minLength={6}
//                 />

//               </div>

//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg mt-4 transition duration-300 ${
//                 loading
//                   ? "opacity-60 cursor-not-allowed"
//                   : "hover:from-purple-600 hover:to-indigo-600"
//               }`}
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>

//             {/* LOGIN */}
//             <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-indigo-600 font-medium hover:underline"
//               >
//                 Sign In
//               </Link>
//             </p>

//             <div className="mt-4 text-center text-sm text-gray-400">
//               or continue with
//             </div>

//             <div className="flex justify-center gap-4 mt-2">

//               <button
//                 type="button"
//                 className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition text-black dark:text-white"
//               >
//                 Google
//               </button>

//               <button
//                 type="button"
//                 className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition text-black dark:text-white"
//               >
//                 Facebook
//               </button>

//             </div>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // SUCCESS LOGIN / REGISTER
  // ============================================

  const handleSuccessfulAuth = (data) => {
    console.log("✅ Authentication successful:", data);

    if (!data?.token) {
      setError(
        "Authentication failed: server did not return a token."
      );
      return;
    }

    // Save JWT
    localStorage.setItem("token", data.token);

    // Save user
    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
    }

    console.log("✅ Token saved");
    console.log(
      "🔐 Token exists:",
      !!localStorage.getItem("token")
    );

    // Show success popup
    setShowSuccess(true);

    // Go to homepage
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  // ============================================
  // NORMAL REGISTRATION
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/register", {
        name: form.name.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("📥 Registration response:", res.data);

      if (!res.data?.token) {
        setError(
          "Registration failed: server did not return a token."
        );
        return;
      }

      handleSuccessfulAuth(res.data);
    } catch (err) {
      console.error("🔥 Registration error:", err);

      setError(
        err.response?.data?.error ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // GOOGLE REGISTRATION / LOGIN
  // ============================================

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      console.log("🔵 Google account authentication started");

      if (!credentialResponse?.credential) {
        setError("Google authentication failed.");
        return;
      }

      const res = await axios.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      console.log(
        "📥 Google authentication response:",
        res.data
      );

      if (!res.data?.token) {
        setError(
          "Google authentication failed: server did not return a token."
        );
        return;
      }

      handleSuccessfulAuth(res.data);
    } catch (err) {
      console.error(
        "🔥 Google registration/login error:",
        err
      );

      setError(
        err.response?.data?.error ||
          "Google authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // GOOGLE ERROR
  // ============================================

  const handleGoogleError = () => {
    console.error("❌ Google authentication failed");

    setError(
      "Google authentication failed. Please try again."
    );
  };

  // ============================================
  // UI
  // ============================================

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 px-4 py-10">

        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          {/* ======================================
              LEFT SECTION
          ====================================== */}

          <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-purple-50">

            <img
              src="/logo.png"
              alt="TalentHub Logo"
              className="h-10 w-auto object-contain mb-6"
            />

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Join TalentHub
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              Create your account and start exploring
              the TalentHub community.
            </p>

            <ul className="text-gray-600 text-sm space-y-3">
              <li>🎵 Learn from talented experts</li>
              <li>🎬 Upload and showcase your talent</li>
              <li>🌟 Explore the Talent Gallery</li>
              <li>👥 Connect with other creators</li>
            </ul>

          </div>

          {/* ======================================
              RIGHT SECTION
          ====================================== */}

          <div className="md:w-1/2 bg-gray-50 px-8 sm:px-10 py-10">

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Create Your Account
            </h2>

            <p className="text-center text-sm text-gray-500 mb-7">
              Join TalentHub and explore your creativity
            </p>

            {/* ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-5">
                {error}
              </div>
            )}

            {/* ==================================
                NORMAL REGISTRATION
            ================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* FIRST NAME */}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

                  <FaUser className="text-gray-400 mr-2" />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full py-3 outline-none bg-transparent text-black"
                    required
                  />

                </div>
              </div>

              {/* LAST NAME */}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

                  <FaUser className="text-gray-400 mr-2" />

                  <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full py-3 outline-none bg-transparent text-black"
                    required
                  />

                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white mt-1 focus-within:ring-2 focus-within:ring-indigo-500">

                  <FaEnvelope className="text-gray-400 mr-2" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full py-3 outline-none bg-transparent text-black"
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

                  <FaLock className="text-gray-400 mr-2" />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full py-3 outline-none bg-transparent text-black"
                    required
                    minLength={6}
                  />

                </div>
              </div>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md transition ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02] hover:shadow-lg"
                }`}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            {/* ==================================
                DIVIDER
            ================================== */}

            <div className="flex items-center my-7">

              <div className="flex-1 h-px bg-gray-300" />

              <span className="px-4 text-sm text-gray-500">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300" />

            </div>

            {/* ==================================
                GOOGLE ONLY
            ================================== */}

            <div className="flex justify-center">

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

            <p className="text-center text-xs text-gray-500 mt-3">
              Continue with Google to create or access
              your TalentHub account.
            </p>

            {/* ==================================
                LOGIN
            ================================== */}

            <p className="text-center text-sm text-gray-600 mt-7">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Log In
              </Link>

            </p>

          </div>
        </div>
      </div>

      {/* ==========================================
          SUCCESS POPUP
      ========================================== */}

      {showSuccess && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm w-full mx-4">

            <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-green-100">

              <span className="text-5xl text-green-600">
                ✓
              </span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Account Ready!
            </h2>

            <p className="text-gray-600 mb-6">
              Thank you for joining TalentHub.
            </p>

            <div className="flex justify-center">

              <div className="w-7 h-7 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

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

export default Register;