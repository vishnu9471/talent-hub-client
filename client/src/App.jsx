// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Learn from "./pages/learn";
// import Upload from "./pages/Upload";
// import Profile from "./pages/Profile";
// import Talent from "./pages/Talent";
// import VideoCategoryPage from "./pages/VideoCategoryPage";
// import PlaylistPage from "./pages/PlaylistPage";
// import ForgotPassword from "./components/ForgotPassword";
// import VerifiedPage from "./pages/VerifiedPage";

// function App() {
//   return (
//     <Router>
//       <div className="relative min-h-screen w-full font-poppins">
//         {/* Navbar fixed at top */}
//         <div className="fixed top-0 left-0 right-0 z-10">
//           <Navbar />
//         </div>

//         {/* Page content */}
//         <main className="pt-20 px-4 sm:px-6">
//           <Routes>
//             {/* Public pages */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Auth-required pages */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/learn" element={<Learn />} />
//             <Route path="/upload" element={<Upload />} />
//             <Route path="/profile/:id" element={<Profile />} />

//             {/* Talent & video routes */}
//             <Route path="/talent" element={<Talent />} />
//             <Route path="/videos/:category" element={<VideoCategoryPage />} />
//             <Route path="/playlist" element={<PlaylistPage />} />

//             {/* Password reset & verification */}
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/verified" element={<VerifiedPage />} />

//             {/* Fallback for unknown routes */}
//             <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/learn";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Talent from "./pages/Talent";
import VideoCategoryPage from "./pages/VideoCategoryPage";
import PlaylistPage from "./pages/PlaylistPage";
import ForgotPassword from "./components/ForgotPassword";
import VerifiedPage from "./pages/VerifiedPage";

function App() {
  return (
    <div className="relative min-h-screen w-full font-poppins">
      {/* ================================
          NAVBAR
      ================================= */}
      <Navbar />

      {/* ================================
          PAGE CONTENT
      ================================= */}
      <main className="pt-20 px-4 sm:px-6">
        <Routes>

          {/* ================================
              PUBLIC ROUTES
          ================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verified"
            element={<VerifiedPage />}
          />

          {/* ================================
              PROTECTED ROUTES
          ================================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/talent"
            element={
              <ProtectedRoute>
                <Talent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/playlist"
            element={
              <ProtectedRoute>
                <PlaylistPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/videos/:category"
            element={
              <ProtectedRoute>
                <VideoCategoryPage />
              </ProtectedRoute>
            }
          />

          {/* ================================
              404 PAGE
          ================================= */}

          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-700">
                    404
                  </h1>

                  <p className="mt-2 text-lg text-gray-500">
                    Page Not Found
                  </p>
                </div>
              </div>
            }
          />

        </Routes>
      </main>
    </div>
  );
}

export default App;