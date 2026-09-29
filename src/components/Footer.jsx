// Footer.jsx
import { IMGS } from "../assets/images.js";
import { COLORS } from "../theme/color.js";
import { HOTEL_NAME, HOTEL_LOCATION, HOTEL_EMAIL, HOTEL_PHONE, WHATSAPP_NUMBER } from "../config.js";

export default function Footer({ setPage }) {
  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    ["Home", "home"],
    ["Rooms & Villas", "rooms"],
    ["Gallery", "gallery"],
    ["Amenities", "amenities"],
    ["About Us", "about"],
    ["Contact", "contact"],
  ];

  return (
    <footer
      style={{
        background: COLORS.primary, // #1C1209 Deep Dark Anchor
        borderTop: `1px solid ${COLORS.gold}`,
        padding: "clamp(50px, 8vw, 70px) 32px 36px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          marginBottom: 48,
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <img
              src={IMGS.skarchanlogo}
              alt="Skardu Resort Logo"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                objectFit: "cover",
                border: `1.5px solid ${COLORS.gold}`,
              }}
            />
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 20,
                color: COLORS.gold,
                letterSpacing: "0.15em",
                fontWeight: 500,
              }}
            >
              {HOTEL_NAME.toUpperCase()}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 13,
              color: COLORS.gold,
              lineHeight: 1.8,
              margin: 0,
              maxWidth: 280,
            }}
          >
            Where the Karakoram peaks meet handcrafted luxury and heritage hospitality.
            <br />
            <span style={{ color: COLORS.gold, fontSize: 12 }}>{HOTEL_LOCATION}</span>
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.gold,
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            Navigate
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navLinks.map(([label, key]) => (
              <span
                key={key}
                onClick={() => navigate(key)}
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: 13,
                  color: COLORS.gold,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "inline-block",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = COLORS.gold;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = COLORS.stone;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: COLORS.gold,
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            Connect
          </h4>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: COLORS.gold, margin: "0 0 10px" }}>
            📍 {HOTEL_LOCATION}
          </p>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: COLORS.gold, margin: "0 0 10px" }}>
            📞 {HOTEL_PHONE}
          </p>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: COLORS.gold, margin: "0 0 14px" }}>
            📧 {HOTEL_EMAIL}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: COLORS.gold,
              fontFamily: "Lato, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "20px",
              transition: "background 0.2s ease",
              width: "fit-content",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37, 211, 102, 0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(37, 211, 102, 0.1)")}
          >
            💬 WhatsApp Concierge
          </a>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(234, 225, 213, 0.12)",
          paddingTop: 24,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: 12,
            color: COLORS.gold,
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} {HOTEL_NAME} · Skardu Valley, Pakistan · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}