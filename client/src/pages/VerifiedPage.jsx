import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifiedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Password Reset Successful!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You have successfully reset your password.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting to the login page...
        </p>
      </div>
    </div>
  );
};

export default VerifiedPage;