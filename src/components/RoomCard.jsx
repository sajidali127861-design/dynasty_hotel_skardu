// components/RoomCard.jsx
import AnimBlock from "./AnimBlock.jsx";
import { COLORS } from "../theme/color.js"; // adjust import path as needed

export default function RoomCard({ room, setPage, setRoomId, delay = 0 }) {
  const handleClick = () => {
    setRoomId(room.id);
    setPage("room-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimBlock delay={delay}>
      <div
        onClick={handleClick}
        style={{
          background: COLORS.white,
          borderRadius: "14px",
          border: `1px solid ${COLORS.border}`,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(28, 18, 9, 0.04)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 18px 38px rgba(28, 18, 9, 0.09)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(28, 18, 9, 0.04)";
        }}
      >
        {/* 1. Image Section */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={room.heroImg}
            alt={room.name}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Elegant Frosted Category Badge */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: COLORS.primary,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: COLORS.white,
              fontSize: 10,
              fontFamily: "Lato, sans-serif",
              letterSpacing: "0.18em",
              padding: "5px 12px",
              borderRadius: "20px",
              fontWeight: 700,
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              textTransform: "uppercase",
            }}
          >
            {room.category ? room.category : "VILLA"}
          </div>
        </div>

        {/* 2. Content Section */}
        <div style={{ padding: "26px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>

          {/* Room Title */}
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: 26,
              color: COLORS.textPrimary,
              margin: "0 0 10px",
              fontWeight: 600,
              lineHeight: 1.15,
            }}
          >
            {room.name}
          </h3>

          {/* Quick Stats */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "20px",
              fontFamily: "Lato, sans-serif",
              fontSize: 12,
              letterSpacing: "0.04em",
              color: COLORS.textSecondary,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>🛏 {room.beds || "King Bed"}</span>
            <span style={{ color: COLORS.border }}>•</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>📐 {room.size || "380 sq ft"}</span>
          </div>

          {/* Spacer */}
          <div style={{ flexGrow: 1 }} />

          {/* Subtle Divider Line */}
          <div style={{ height: 1, background: COLORS.lightBorder, marginBottom: 18 }} />

          {/* 3. Price & Action Button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: 10,
                  color: COLORS.textMuted,
                  fontFamily: "Lato, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                }}
              >
                Starting from
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 24,
                    color: COLORS.textPrimary,
                    fontWeight: 700,
                  }}
                >
                  {room.price}
                </span>
                <span style={{ fontSize: 11, fontFamily: "Lato, sans-serif", color: COLORS.textLight }}>
                  / night
                </span>
              </div>
            </div>

            {/* Signature Deep Teal CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              style={{
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                padding: "10px 20px",
                borderRadius: "24px",
                fontFamily: "Lato, sans-serif",
                fontSize: 11,
                letterSpacing: "0.14em",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 14px rgba(23, 74, 59, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.primaryDark;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.primary;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              VIEW ROOM
            </button>
          </div>

        </div>
      </div>
    </AnimBlock>
  );
}
