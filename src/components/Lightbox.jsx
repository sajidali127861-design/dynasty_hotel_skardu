// components/Lightbox.jsx — Shared fullscreen image lightbox
// Used by GalleryPage and RoomDetailPage so every image grid in the
// site opens the same way. Supports arrow buttons, dot navigation,
// and swipe left/right on touch devices.
import { useState, useRef } from "react";

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const img = images[idx];
  const touchStartX = useRef(null);

  const goPrev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const goNext = () => setIdx(i => (i + 1) % images.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      diff > 0 ? goPrev() : goNext();
    }
    touchStartX.current = null;
  };

  if (!img) return null;

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position: "fixed", inset: 0, background: "rgba(18,10,4,0.97)", zIndex: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    >
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 28, background: "none", border: "none", color: "#F5EFE6", fontSize: 36, cursor: "pointer", zIndex: 10 }}>✕</button>

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); goPrev(); }}
        className="lightbox-arrow"
        style={{ position: "absolute", left: 16, background: "none", border: "none", color: "#C4922A", fontSize: 52, cursor: "pointer", zIndex: 10, lineHeight: 1 }}>‹</button>

      <img
        src={img.src}
        alt={img.alt}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: "88vw", maxHeight: "82vh", objectFit: "contain", boxShadow: "0 0 80px rgba(0,0,0,0.9)" }}
      />

      {/* Caption */}
      {img.caption && (
        <div style={{ marginTop: 16, textAlign: "center" }} onClick={e => e.stopPropagation()}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 18, color: "#EDE0CE", margin: "0 0 4px" }}>{img.caption}</p>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 11, letterSpacing: 2, color: "#C4922A", margin: 0 }}>{idx + 1} / {images.length}</p>
        </div>
      )}

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); goNext(); }}
        className="lightbox-arrow"
        style={{ position: "absolute", right: 16, background: "none", border: "none", color: "#C4922A", fontSize: 52, cursor: "pointer", zIndex: 10, lineHeight: 1 }}>›</button>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 20, display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "center", maxWidth: "80vw" }}>
        {images.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 4, background: i === idx ? "#C4922A" : "rgba(245,239,230,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .lightbox-arrow { font-size: 38px !important; }
        }
      `}</style>
    </div>
  );
}
