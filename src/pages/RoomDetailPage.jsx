// pages/RoomDetailPage.jsx
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import ThankYouModal from "../components/ThankYouModal.jsx";
import MultiRoomBookingModal from "../components/MultiRoomBookingModal.jsx";
import { ROOMS, defaultVariantKey } from "../data/rooms.js";
import { HOTEL_EMAIL, HOTEL_PHONE } from "../config.js";
import { COLORS } from "../theme/color.js";

// ── Reusable Info Box Component ───────────────────────────────
function InfoBox({ title, items, children }) {
  return (
    <div style={{ border: "1px solid #1C1209", borderRadius: 4, padding: "24px", marginBottom: "20px", background: "#FFFFFF" }}>
      <h3 style={{ fontFamily: "Lato, sans-serif", fontSize: 17, color: "#1C1209", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 16px", fontWeight: 400, borderBottom: "1px solid #E5E5E5", paddingBottom: 12, textAlign: title === "PRICE" || title === "AMENITIES" || title.includes("US") ? "center" : "left" }}>
        {title}
      </h3>
      {items && items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <span style={{ color: "#C4922A", fontSize: 14 }}>➔</span>
          <span style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#333", lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
      {children}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function RoomDetailPage({ roomId, setPage }) {
  const room = ROOMS.find(r => r.id === roomId) || ROOMS[0];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [roomId]);

  // Build lightbox-friendly image objects from the room's gallery array
  const galleryImages = room.gallery.map((src, i) => ({
    src,
    alt: `${room.name} — photo ${i + 1}`,
    caption: `${room.name} — Photo ${i + 1} of ${room.gallery.length}`,
  }));

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: 80 }}>

      {/* Hero image */}
      <div style={{ position: "relative", height: "45vh", minHeight: 300 }}>
        <img src={room.heroImg} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, padding: "0 48px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 5vw, 56px)", color: "#FFFFFF", margin: 0, fontWeight: 300 }}>
            {room.name}
          </h1>
        </div>
      </div>

      {/* Main Content Split Layout */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 32px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40, alignItems: "start" }}>

        {/* Left Column */}
        <div>
          <AnimBlock>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#333", lineHeight: 1.8, marginBottom: 40 }}>
              {room.longDesc}
            </p>
          </AnimBlock>

          <AnimBlock delay={0.1}>
            <InfoBox title="MEASUREMENTS:" items={room.measurements} />
            <InfoBox title="FACILITIES:" items={room.facilities} />
            <InfoBox title="EXTRA:" items={room.extra} />
          </AnimBlock>
        </div>

        {/* Right Column */}
        <div style={{ position: "sticky", top: 100 }}>
          <AnimBlock delay={0.2}>

            <InfoBox title="PRICE">
              <div style={{ textAlign: "center" }}>

                {/* 1st Line: Non-AC Price */}
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#333", margin: room.priceAC ? "0 0 8px" : "0 0 16px", fontWeight: 700 }}>
                  <span style={{ color: "#C4922A", marginRight: 8 }}>➔</span> {room.price} / Per Night (Non AC)
                </p>

                {/* 2nd Line: With AC Price (Yeh sirf tab show hogi jab rooms.js mein priceAC majood ho) */}
                {room.priceAC && (
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: 13, color: "#333", margin: "0 0 16px", fontWeight: 700 }}>
                    <span style={{ color: "#C4922A", marginRight: 8 }}>➔</span> {room.priceAC} / Per Night (with AC)
                  </p>
                )}

                <button
                  onClick={() => setIsBookingOpen(true)}
                  style={{
                    width: "100%", padding: "12px", background: COLORS.primary, color: "#fff", border: "none", borderRadius: 4,
                    fontWeight: 600, fontSize: 14, fontFamily: "Lato, sans-serif", cursor: "pointer"
                  }}
                >
                  Book This {room.category}
                </button>
              </div>
            </InfoBox>

            <InfoBox title="AMENITIES" items={room.amenities} />

            <InfoBox title="CALL US AT">
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#333", margin: 0, textAlign: "center" }}>
                <span style={{ color: "#C4922A", marginRight: 8 }}>📞</span> {HOTEL_PHONE}
              </p>
            </InfoBox>

            <InfoBox title="EMAIL US AT">
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#333", margin: 0, textAlign: "center" }}>
                <span style={{ color: "#C4922A", marginRight: 8 }}>✉️</span> {HOTEL_EMAIL}
              </p>
            </InfoBox>

          </AnimBlock>
        </div>
      </div>

      {/* Photo Gallery — grid on desktop, swipeable carousel on mobile, opens Lightbox on click */}
      <div style={{ maxWidth: 1100, margin: "0 auto 80px", padding: "0 32px" }}>
        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, color: "#1C1209", margin: "0 0 20px" }}>Room Gallery</h3>
        <div className="room-gallery-grid">
          {room.gallery.map((src, i) => (
            <div key={i} className="room-gallery-item" onClick={() => setGalleryLightboxIdx(i)}>
              <img src={src} alt={`${room.name} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Modals — same single booking route as the Navbar's "BOOK NOW",
          just opened here with this room's base (Non-AC) rate pre-selected
          so the guest can still add other rooms/rates before submitting. */}
      {isBookingOpen && (
        <MultiRoomBookingModal
          initialQuantities={{ [defaultVariantKey(room)]: 1 }}
          primaryRoomId={room.id}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => { setIsBookingOpen(false); setIsThankYouOpen(true); }}
        />
      )}
      {isThankYouOpen && <ThankYouModal onClose={() => setIsThankYouOpen(false)} />}
      {galleryLightboxIdx !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={galleryLightboxIdx}
          onClose={() => setGalleryLightboxIdx(null)}
        />
      )}

      <Footer setPage={setPage} />

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 860px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: relative !important;
            top: 0 !important;
          }
        }

        /* Room gallery — grid on desktop */
        .room-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        .room-gallery-item {
          cursor: zoom-in;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #EFEFEF;
        }
        .room-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .room-gallery-item:hover img {
          transform: scale(1.06);
        }

        /* Room gallery — swipeable horizontal carousel on mobile */
        @media (max-width: 768px) {
          .room-gallery-grid {
            display: flex;
            grid-template-columns: none;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 12px;
            padding-bottom: 10px;
          }
          .room-gallery-item {
            flex: 0 0 85%;
            scroll-snap-align: center;
          }
        }
      `}</style>
    </div>
  );
}
