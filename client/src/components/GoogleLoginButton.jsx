import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";

const GoogleLoginButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      if (!credentialResponse?.credential) {
        throw new Error("Google credential was not received.");
      }

      console.log("✅ Google credential received");
      console.log("📤 Sending Google credential to backend...");

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      console.log("📥 Google backend response:", response.data);

      if (!response.data?.success) {
        throw new Error(
          response.data?.error ||
            response.data?.message ||
            "Google authentication failed."
        );
      }

      const { token, user } = response.data;

      if (!token) {
        throw new Error(
          "Backend did not return an authentication token."
        );
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      window.dispatchEvent(new Event("authChanged"));

      console.log("✅ Google authentication successful");
      console.log(
        "🔐 Token saved:",
        !!localStorage.getItem("token")
      );
      console.log("👤 User:", user);

      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error) {
      console.error("🔥 Google authentication error:", error);

      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Google login failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("❌ Google authentication failed.");

    alert(
      "Google authentication could not be started. Please check your internet connection and Google OAuth configuration."
    );
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <span>Signing in with Google...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex justify-center"
      style={{ minHeight: "44px" }}
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        width="350"
      />
    </div>
  );
};

export default GoogleLoginButton;