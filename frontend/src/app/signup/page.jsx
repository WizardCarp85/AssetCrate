"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call signup API
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Success - redirect to login
      alert("Signup successful! Please login.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Home Link */}
      <Link
        href="/"
        className="fixed top-6 left-6 px-4 py-2 text-white hover:text-blue-300 transition-colors font-semibold flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Home
      </Link>

      {/* Form Container */}
      <div className="max-w-md w-full mx-4 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent mb-2">
            Join AssetCrate
          </h2>
          <p className="text-gray-300 text-sm">Create your account to start discovering or sharing game assets</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4 flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Choose a username"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-semibold mb-3">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200"
                style={{
                  borderColor: formData.role === "USER" ? "rgb(59, 130, 246)" : "rgba(255, 255, 255, 0.2)",
                  backgroundColor: formData.role === "USER" ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.05)"
                }}>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={formData.role === "USER"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">👨‍💻</div>
                  <span className="text-gray-200 font-medium block">Developer</span>
                  <span className="text-xs text-gray-400">Browse assets</span>
                </div>
              </label>
              <label className="flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200"
                style={{
                  borderColor: formData.role === "CREATOR" ? "rgb(59, 130, 246)" : "rgba(255, 255, 255, 0.2)",
                  backgroundColor: formData.role === "CREATOR" ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.05)"
                }}>
                <input
                  type="radio"
                  name="role"
                  value="CREATOR"
                  checked={formData.role === "CREATOR"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🎨</div>
                  <span className="text-gray-200 font-medium block">Creator</span>
                  <span className="text-xs text-gray-400">Share assets</span>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-transparent bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold hover:opacity-80 transition-opacity">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;