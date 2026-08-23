import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBookOpen,
  FaUpload,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ============================================
  // CHECK LOGIN STATUS
  // ============================================

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      setIsLoggedIn(!!token);

      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };

    checkAuth();

    // Listen when login/logout happens
    window.addEventListener("authChanged", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // ============================================
  // PROTECTED NAVIGATION
  // ============================================

  const handleProtectedClick = (e, path) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setShowLoginPopup(true);
      setMobileMenu(false);
      return;
    }

    setMobileMenu(false);
    navigate(path);
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    window.dispatchEvent(new Event("authChanged"));

    setMobileMenu(false);

    navigate("/");
  };

  // ============================================
  // LOGIN NOW
  // ============================================

  const handleLogin = () => {
    setShowLoginPopup(false);
    navigate("/login");
  };

  // ============================================
  // REGISTER
  // ============================================

  const handleRegister = () => {
    setShowLoginPopup(false);
    navigate("/register");
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#dbeafe] border-b border-blue-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* ==================================================
                LOGO
            ================================================== */}

            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setMobileMenu(false)}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-105 transition">
                T
              </div>

              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight">
                TalentHub
              </span>
            </Link>

            {/* ==================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <div className="hidden md:flex items-center gap-2">

              {/* HOME - PUBLIC */}
              <Link
                to="/"
                className="px-4 py-2 rounded-xl text-gray-800 font-semibold hover:bg-white/70 hover:text-indigo-700 transition"
              >
                Home
              </Link>

              {/* LEARN - PROTECTED */}
              <a
                href="/learn"
                onClick={(e) => handleProtectedClick(e, "/learn")}
                className="px-4 py-2 rounded-xl text-gray-800 font-semibold hover:bg-white/70 hover:text-indigo-700 transition cursor-pointer"
              >
                Learn
              </a>

              {/* UPLOAD - PROTECTED */}
              <a
                href="/upload"
                onClick={(e) => handleProtectedClick(e, "/upload")}
                className="px-4 py-2 rounded-xl text-gray-800 font-semibold hover:bg-white/70 hover:text-indigo-700 transition cursor-pointer"
              >
                Upload
              </a>

              {/* TALENT GALLERY - PROTECTED */}
              <a
                href="/talent"
                onClick={(e) => handleProtectedClick(e, "/talent")}
                className="px-4 py-2 rounded-xl text-gray-800 font-semibold hover:bg-white/70 hover:text-indigo-700 transition cursor-pointer"
              >
                Talent Gallery
              </a>

              {/* ==================================================
                  LOGGED IN
              ================================================== */}

              {isLoggedIn ? (
                <div className="flex items-center ml-3 gap-2">

                  {/* PROFILE */}
                  <div className="relative group">

                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 hover:bg-white transition shadow-sm"
                    >
                      {user?.profileImage || user?.avatar ? (
                        <img
                          src={user.profileImage || user.avatar}
                          alt="Profile"
                          className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
                        />
                      ) : (
                        <FaUserCircle className="text-indigo-600 text-3xl" />
                      )}

                      <span className="font-semibold text-gray-800 max-w-[120px] truncate">
                        {user?.name || user?.username || "Account"}
                      </span>
                    </button>

                    {/* DROPDOWN */}
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">

                      <button
                        onClick={(e) =>
                          handleProtectedClick(e, "/dashboard")
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        <FaTachometerAlt />
                        Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>

                    </div>
                  </div>
                </div>
              ) : (
                /* ==================================================
                   NOT LOGGED IN
                ================================================== */

                <Link
                  to="/login"
                  className="ml-3 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 hover:scale-105 transition"
                >
                  Login
                </Link>
              )}
            </div>

            {/* ==================================================
                MOBILE MENU BUTTON
            ================================================== */}

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 text-gray-800 shadow-md"
            >
              {mobileMenu ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        {mobileMenu && (
          <div className="md:hidden bg-[#dbeafe] border-t border-blue-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">

              {/* HOME */}
              <Link
                to="/"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 font-semibold"
              >
                <FaHome />
                Home
              </Link>

              {/* LEARN */}
              <button
                onClick={(e) => handleProtectedClick(e, "/learn")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 font-semibold text-left"
              >
                <FaBookOpen />
                Learn
              </button>

              {/* UPLOAD */}
              <button
                onClick={(e) => handleProtectedClick(e, "/upload")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 font-semibold text-left"
              >
                <FaUpload />
                Upload
              </button>

              {/* TALENT */}
              <button
                onClick={(e) => handleProtectedClick(e, "/talent")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/70 font-semibold text-left"
              >
                <FaUsers />
                Talent Gallery
              </button>

              {isLoggedIn ? (
                <>
                  <button
                    onClick={(e) =>
                      handleProtectedClick(e, "/dashboard")
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/70 font-semibold text-left"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-left"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="block text-center mt-3 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ==================================================
          LOGIN REQUIRED POPUP
      ================================================== */}

      {showLoginPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center animate-[fadeIn_0.2s_ease-out]">

            {/* CLOSE */}
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition"
            >
              ✕
            </button>

            {/* ICON */}
            <div className="mx-auto w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
              <FaUserCircle className="text-5xl text-indigo-600" />
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
              Please Login First
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-600 leading-relaxed mb-7">
              Please login to explore all the amazing features of{" "}
              <span className="font-bold text-indigo-600">
                TalentHub
              </span>
              .
              <br />
              Create your account and start your creative journey!
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleLogin}
                className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 hover:scale-[1.02] transition"
              >
                Login Now
              </button>

              <button
                onClick={handleRegister}
                className="flex-1 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition"
              >
                Create Account
              </button>

            </div>

            <p className="text-xs text-gray-400 mt-5">
              Join TalentHub and showcase your talent to the world.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;