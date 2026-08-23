// import axios from "axios";

// // Base API URL from .env
// // Correct the base URL to point to the backend server
// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// console.log("API Base URL:", BASE_URL);

// // Create Axios instance
// const instance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token automatically for every request
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Global error handling (optional)
// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default instance;














// import axios from "axios";

// const BASE_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// console.log("API Base URL:", BASE_URL);

// const instance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ============================================
// // ATTACH JWT TOKEN
// // ============================================

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     console.log(
//       "🔑 Token:",
//       token ? "✅ Found" : "❌ Missing"
//     );

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // ============================================
// // RESPONSE ERROR HANDLER
// // ============================================

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.error(
//       "API Error:",
//       error.response?.data || error.message
//     );

//     // If JWT expired/invalid, remove it
//     if (error.response?.status === 401) {
//       console.warn("⚠️ Authentication failed");

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;








import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

console.log(
  "API Base URL:",
  BASE_URL
);

const instance = axios.create({
  baseURL: BASE_URL,

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },
});

// ======================================================
// ATTACH JWT TOKEN
// ======================================================

instance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    console.log(
      "🔑 Token:",
      token
        ? "✅ Found"
        : "❌ Missing"
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ======================================================
// RESPONSE ERROR HANDLER
// ======================================================

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    console.error(
      "API Error:",
      error.response?.data ||
        error.message
    );

    if (
      error.response?.status === 401
    ) {
      console.warn(
        "⚠️ Authentication failed"
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );
    }

    return Promise.reject(error);
  }
);

export default instance;