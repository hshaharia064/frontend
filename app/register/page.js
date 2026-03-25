"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add your fetch register logic here
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blob */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
          bottom: "-120px",
          right: "-80px",
          pointerEvents: "none",
        }}
      />

      <div
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
              background: "linear-gradient(135deg, #fff, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create account
          </h1>
          <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.95rem" }}>
            Fill in the details to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label
              htmlFor="reg-username"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--text-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              placeholder="Your name"
              className="input-field"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reg-email"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--text-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Email
            </label>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              className="input-field"
              required
            />
          </div>

          {/* <div>
            <label
              htmlFor="reg-phone"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--text-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Phone
            </label>
            <input
              id="reg-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="input-field"
              required
            />
          </div> */}

          <div>
            <label
              htmlFor="reg-password"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--text-muted)",
                marginBottom: "0.4rem",
              }}
            >
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button onClick={handleSubmit} type="submit" className="btn-accent" style={{ marginTop: "0.5rem", width: "100%" }}>
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
