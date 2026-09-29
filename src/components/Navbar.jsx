import { useState, useEffect } from "react";
import { IMGS } from "../assets/images.js";
import { HOTEL_NAME } from "../config.js";
import MultiRoomBookingModal from "./MultiRoomBookingModal.jsx";
import ThankYouModal from "./ThankYouModal.jsx";
import { COLORS } from "../theme/color.js";

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Rooms", key: "rooms" },
    { label: "Gallery", key: "gallery" },
    { label: "Amenities", key: "amenities" },
    { label: "About", key: "about" },
    { label: "Contact", key: "contact" },
  ];

  const openBooking = () => { setIsBookingOpen(true); setMenuOpen(false); };

  const isSolid = scrolled || page !== "home";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: isSolid ? "rgba(255, 255, 255, 0.98)" : "transparent",
        backdropFilter: isSolid ? "blur(14px)" : "none",
        borderBottom: isSolid ? "1px solid #E5E5E5" : "none",
        padding: isSolid ? "10px 32px" : "18px 32px",
        boxShadow: isSolid ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={IMGS.skarchanlogo}
            alt="Sukoon Resorts"
            style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #C4922A" }}
          />
          <span style={{
            fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 700,
            color: isSolid ? "#1C1209" : "#F5EFE6", letterSpacing: 1,
            transition: "color 0.4s",
          }}>
            {HOTEL_NAME.toUpperCase()}
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 26, alignItems: "center" }} className="desktop-nav-links">
          {navLinks.map(({ label, key }) => (
            <span
              key={key}
              onClick={() => navigate(key)}
              style={{
                cursor: "pointer", fontFamily: "Lato, sans-serif", fontSize: 13, letterSpacing: 1,
                color: page === key ? COLORS.primary : (isSolid ? "#1C1209" : "#F5EFE6"),
                borderBottom: page === key ? "1px solid " : "1px solid transparent",
                paddingBottom: 2, fontWeight: page === key ? 700 : 400,
                transition: "color 0.3s, border-color 0.3s",
              }}
            >
              {label}
            </span>
          ))}
          {/* <button onClick={openBooking} className="btn-gold" style={{ padding: "8px 20px", fontSize: 12 }}>
            BOOK NOW
          </button> */}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            display: "none", background: "none", border: "none",
            color: isSolid ? "#1C1209" : "#F5EFE6", fontSize: 28, lineHeight: 1,
          }}
          className="hamburger-btn"
        >
          ☰
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(255, 255, 255, 0.98)",
          zIndex: 200, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 28,
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 22, right: 26, background: "none", border: "none", fontSize: 32, color: "#1C1209" }}
          >
            ✕
          </button>
          <img src={IMGS.skarchanlogo} alt="logo" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid #C4922A", marginBottom: 8 }} />
          {navLinks.map(({ label, key }) => (
            <span
              key={key}
              onClick={() => navigate(key)}
              style={{
                fontFamily: "Cormorant Garamond, serif", fontSize: 34, cursor: "pointer",
                color: page === key ? "#C4922A" : "#1C1209", fontWeight: 600,
              }}
            >
              {label}
            </span>
          ))}
          <button
            onClick={openBooking}
            className="btn-whatsapp"
            style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}
          >
            📅 BOOK NOW
          </button>
        </div>
      )}

      {/* Multi-room booking flow */}
      {isBookingOpen && (
        <MultiRoomBookingModal
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => { setIsBookingOpen(false); setIsThankYouOpen(true); }}
        />
      )}
      {isThankYouOpen && <ThankYouModal onClose={() => setIsThankYouOpen(false)} />}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav-links { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
