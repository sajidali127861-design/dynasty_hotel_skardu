// pages/ContactPage.jsx
import { useState } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { COLORS } from "../theme/color.js";
import { HOTEL_LOCATION, HOTEL_EMAIL, HOTEL_PHONE, WHATSAPP_NUMBER, buildGeneralEnquiryMessage } from "../config.js";

export default function ContactPage({ setPage }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendEnquiry = () => {
    const msg = buildGeneralEnquiryMessage(name, message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent(`General Enquiry - ${name || "Guest"}`);
    const body = encodeURIComponent(`Hi TAAJ RESIDENCE SKARDU Skardu,\n\n${message}\n\nBest regards,\n${name}`);
    window.open(`mailto:${HOTEL_EMAIL}?subject=${subject}&body=${body}`, "_self");
  };

  const inputStyle = {
    width: "100%", background: "#FDFBF7", border: "1px solid #C8B49A",
    padding: "14px", fontFamily: "Lato, sans-serif", fontSize: 14,
    color: "#F5EFE6", outline: "none", borderRadius: 8, boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  const labelStyle = {
    fontFamily: "Lato, sans-serif", fontSize: 11, letterSpacing: 2,
    color: COLORS.gold, display: "block", marginBottom: 8, textTransform: "uppercase",
    fontWeight: "bold"
  };

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", paddingTop: 80 }}>

      {/* Header Banner */}
      <div style={{ background: COLORS.primary, padding: "80px 32px", textAlign: "center" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: COLORS.white }}>GET IN TOUCH</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 6vw, 64px)", color: "#F5EFE6", fontWeight: 300, letterSpacing: 3, margin: "10px 0" }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: COLORS.gold, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            Our team is here to help you plan the perfect mountain escape. Select your preferences or send an enquiry directly via WhatsApp or Email.
          </p>
        </AnimBlock>
      </div>

      {/* Main Content Layout Container */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>

        {/* Top Section: Local Hotel Information Grid */}
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "#1C1209", margin: "0 0 12px", fontWeight: 400 }}>We'd Love to Hear From You</h2>
            <div className="gold-divider" style={{ margin: "0 auto 32px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", textAlign: "left" }}>
              {[
                ["📍", "Location", HOTEL_LOCATION],
                ["📞", "Phone / WhatsApp", HOTEL_PHONE],
                ["📧", "Email", HOTEL_EMAIL],
                ["🕐", "Booking Hours", "Open Daily · 8AM – 10PM PKT"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ background: "#FFF", border: "1px solid #EAE1D5", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: 11, letterSpacing: 1.5, color: "#984A1C", margin: "0 0 4px", fontWeight: 700, textTransform: "uppercase" }}>{label}</p>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#333", margin: 0, lineHeight: 1.4 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimBlock>

        {/* Bottom Section: Primary Enquiry Card Form */}
        <AnimBlock delay={0.1}>
          {/* Matches exactly with the top banner dark brown color (#2C1F14) */}
          <div style={{ background: COLORS.primary, border: "1px solid #3D2D1E", borderRadius: "16px", padding: "40px 32px", boxShadow: "0 10px 35px rgba(0,0,0,0.15)" }}>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: "#F5EFE6", margin: "0 0 8px", textAlign: "center" }}>Send an Enquiry</h3>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: COLORS.gold, textAlign: "center", marginBottom: "32px" }}>
              Fill out the details below and reach us instantly through your preferred channel.
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Your Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ahmed Khan" style={{ ...inputStyle, color: COLORS.textSecondary }} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Your Message</label>
              <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your visit — tentative dates, suite preference, group size…" style={{ ...inputStyle, color: COLORS.textSecondary, resize: "vertical" }} />
            </div>

            {/* Flex Container for Dual Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Button 1: WhatsApp Contact */}
              <button
                onClick={sendEnquiry}
                className="btn-whatsapp"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  boxShadow: "0 4px 14px rgba(37,211,102,0.15)"
                }}
              >
                📱 SEND VIA WHATSAPP
              </button>

              {/* Button 2: International Email Contact */}
              <button
                onClick={sendEmail}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  borderRadius: "8px",
                  background: "#C8B49A",
                  border: "1px solid #C8B49A",
                  color: "#1C1209",
                  fontFamily: "Lato, sans-serif",
                  fontWeight: "bold",
                  fontSize: "15px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)"
                }}
                onMouseOver={e => e.currentTarget.style.background = "#F5EFE6"}
                onMouseOut={e => e.currentTarget.style.background = "#FFFFFF"}
              >
                ✉️ SEND VIA EMAIL
              </button>
            </div>
          </div>
        </AnimBlock>

      </div>

      <Footer setPage={setPage} />
    </div>
  );
}