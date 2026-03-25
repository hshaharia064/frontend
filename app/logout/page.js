"use client";

import Link from "next/link";

export default function LogoutPage() {
  const handleLogout = () => {
    // TODO: add your fetch logout logic here
  };

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
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,106,0.1), transparent 70%)",
          top: "-80px",
          right: "-80px",
          pointerEvents: "none",
        }}
      />

      <div
        className="glass-card animate-fade-in"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 1.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,77,106,0.1)",
            border: "1px solid rgba(255,77,106,0.2)",
            fontSize: "1.8rem",
          }}
        >
          👋
        </div>

        <h1
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            margin: "0 0 0.6rem",
            background: "linear-gradient(135deg, #fff, #fca5a5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Leaving so soon?
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            margin: "0 0 2rem",
            fontSize: "0.95rem",
            lineHeight: 1.6,
          }}
        >
          Are you sure you want to log out? You&apos;ll need to sign in again to access your profile.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button onClick={handleLogout} className="btn-danger" style={{ width: "100%" }}>
            Yes, log me out
          </button>

          <Link
            href="/"
            style={{
              display: "inline-block",
              width: "100%",
              padding: "0.8rem 2rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--card-border)",
              background: "transparent",
              color: "var(--foreground)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              textAlign: "center",
              transition: "all 0.25s ease",
            }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
