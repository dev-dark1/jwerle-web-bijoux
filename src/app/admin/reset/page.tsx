"use client";

import React, { useState } from "react";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "rabaailyass2004@gmail.com",
          otp,
          newPassword: password,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Invalid OTP");
        return;
      }

      setSuccess(true);
    } catch (e) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-bg p-6">
      <div className="w-full max-w-md bg-black-soft p-8 rounded-xl border border-gold/20 shadow-xl">

        <h1 className="text-3xl font-serif text-gold text-center mb-4">
          Create New Password
        </h1>

        {!success && (
          <div className="space-y-4">

            <input
              placeholder="Enter 8-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full py-3 px-4 bg-black-bg border border-white/10 rounded-xl text-white"
            />

            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 bg-black-bg border border-white/10 rounded-xl text-white"
            />

            <button
              onClick={handleReset}
              disabled={loading || otp.length < 8 || password.length < 6}
              className="w-full py-3 bg-gradient-gold text-black rounded-xl font-bold"
            >
              {loading ? "Saving…" : "Reset Password"}
            </button>
          </div>
        )}

        {success && (
          <div className="text-center text-gold mt-4 text-xl">
            Password changed successfully!
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}