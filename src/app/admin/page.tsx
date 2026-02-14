"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // require OTP → redirect to OTP page
      if (data.requireOtp) {
        localStorage.setItem("reset_email", email);
        window.location.href = "/admin/otp";
        return;
      }

      // trusted device → dashboard direct
      localStorage.setItem("bijoux_admin_token", data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-bg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black-soft border border-gold/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)]"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif text-gold">Admin Portal</h1>
          <p className="text-silver/60">Secure login — BIJOUX IYL</p>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 mb-4 bg-black-bg border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-gold"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 mb-4 bg-black-bg border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-gold"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className="w-full py-3 bg-gradient-gold text-black font-bold rounded-xl"
        >
          {loading ? "Checking..." : "Login"}
        </button>

        {/* FORGOT PASSWORD */}
        <p className="text-center text-silver/60 mt-4">
          Forgot password?{" "}
          <a
            href="/admin/forgot"
            className="text-gold hover:underline cursor-pointer"
          >
            Reset here
          </a>
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
      </motion.div>
    </div>
  );
}
