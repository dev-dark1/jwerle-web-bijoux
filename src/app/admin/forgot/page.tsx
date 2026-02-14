"use client";

import React, { useState } from "react";

export default function ForgotPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/admin/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "rabaailyass2004@gmail.com" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (e) {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-bg p-6">
      <div className="w-full max-w-md bg-black-soft p-8 rounded-xl border border-gold/20 shadow-xl">

        <h1 className="text-3xl font-serif text-gold text-center mb-4">
          Reset Password
        </h1>

        {!success && (
          <>
            <p className="text-silver/60 text-center mb-4">
              اضغط لإرسال كود إعادة تعيين كلمة المرور
            </p>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-gold text-black rounded-xl font-bold"
            >
              {loading ? "Sending…" : "Send Reset OTP"}
            </button>
          </>
        )}

        {success && (
          <>
            <p className="text-silver/70 mt-4 text-center">
              تم إرسال كود إعادة التعيين! تفقد بريدك.
            </p>

            <button
              onClick={() => (window.location.href = "/admin/reset")}
              className="w-full mt-4 py-3 bg-gold text-black rounded-xl font-bold"
            >
              Continue
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
      </div>
    </div>
  );
}