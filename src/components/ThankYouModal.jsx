// components/ThankYouModal.jsx — Shared post-booking confirmation dialog
export default function ThankYouModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#F9F6F0", maxWidth: 440, width: "100%", borderRadius: 12, padding: "44px 32px", textAlign: "center", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#8C7B6B" }}>✕</button>
        <div style={{ fontSize: 46, marginBottom: 14 }}>✅</div>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: "#1C1209", margin: "0 0 14px" }}>Thank You!</h2>
        <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14.5, color: "#555", lineHeight: 1.8, margin: "0 0 28px" }}>
          Thank you for booking with Sukoon Resorts. Your booking has been placed successfully. For confirmation, our team will call you shortly on the number you provided.
        </p>
        <button
          onClick={onClose}
          style={{ background: "#984A1C", color: "#fff", border: "none", padding: "12px 34px", borderRadius: 6, fontFamily: "Lato, sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1, cursor: "pointer" }}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
