import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api";

const GoogleLoginButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      if (!credentialResponse?.credential) {
        throw new Error("Google credential was not received.");
      }

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      if (response.data?.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (onSuccess) {
          onSuccess(user);
        }
      }
    } catch (error) {
      console.error("Google login error:", error);

      const message =
        error.response?.data?.error ||
        "Google login failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <div className="text-sm text-gray-500">
          Signing in with Google...
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          width="100%"
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;