// pages/GalleryPage.jsx — Full gallery with category filters + lightbox
import { useState } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { COLORS } from "../theme/color.js";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "../data/rooms.js";
import { HOTEL_NAME } from "../config.js";

// ── Main Page ─────────────────────────────────────────────────
export default function GalleryPage({ setPage }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Kyunke GALLERY_IMAGES direct links hain, filter sirf "all" par chalega
  const filtered = activeCategory === "all"
    ? GALLERY_IMAGES
    : [];

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", paddingTop: 80 }}>

      {/* Page header */}
      <div style={{ background: COLORS.primary, padding: "70px 32px", textAlign: "center" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: COLORS.white }}>VISUAL STORIES</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 6vw, 68px)", color: "#F5EFE6", fontWeight: 300, letterSpacing: 3 }}>
            Gallery
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: COLORS.gold, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.8 }}>
            A glimpse into the beauty of  {HOTEL_NAME} — from our heritage-inspired rooms to the majestic Karakoram that surrounds us.
          </p>
        </AnimBlock>
      </div>

      {/* Category filter */}
      <div style={{ padding: "32px 32px 8px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {GALLERY_CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              style={{
                padding: "8px 22px", borderRadius: 2, cursor: "pointer",
                border: COLORS.border,
                background: activeCategory === id ? COLORS.primary : "transparent",
                color: activeCategory === id ? "#F5EFE6" : "#555555",
                fontFamily: "Lato, sans-serif", fontSize: 11, letterSpacing: 2,
                fontWeight: 700, transition: "all 0.3s",
              }}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 90px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {/* Yahan changes ki gayi hain taake direct string (link) read ho sake */}
          {filtered.map((imgUrl, i) => (
            <AnimBlock key={i} delay={i * 0.04}>
              <div
                onClick={() => setLightboxIdx(i)}
                style={{
                  cursor: "zoom-in", overflow: "hidden", borderRadius: 2,
                  background: "#EDE0CE", position: "relative",
                  border: "1px solid #C8B49A",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={imgUrl} /* Direct URL use kiya gaya hai */
                  alt={`Gallery view ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.55s ease" }}
                  onMouseOver={e => e.target.style.transform = "scale(1.07)"}
                  onMouseOut={e => e.target.style.transform = "scale(1)"}
                />
                {/* Hover caption overlay */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(30,18,8,0.75))",
                  padding: "24px 14px 14px",
                  opacity: 0, transition: "opacity 0.3s",
                }}
                  onMouseOver={e => e.currentTarget.style.opacity = 1}
                  onMouseOut={e => e.currentTarget.style.opacity = 0}
                >
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: "#F5EFE6", margin: 0, fontStyle: "italic" }}>
                    View Full Image
                  </p>
                </div>
              </div>
            </AnimBlock>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", fontFamily: "Lato, sans-serif", color: "#8C7B6B", padding: "60px 0" }}>
            No photos in this category yet.
          </p>
        )}

        {/* Count */}
        <p style={{ textAlign: "center", fontFamily: "Lato, sans-serif", fontSize: 12, color: "#8C7B6B", marginTop: 32, letterSpacing: 1 }}>
          Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          /* Lightbox ko wapas objects bana kar bhej rahe hain taake wo break na ho */
          images={filtered.map(url => ({ src: url }))}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}