// pages/RoomsPage.jsx
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Footer from "../components/Footer.jsx";
import { ROOMS } from "../data/rooms.js";
import { COLORS } from "../theme/color.js";
import { HOTEL_NAME } from "../config.js";

export default function RoomsPage({ setPage, setRoomId }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "4 Bed-Chalet", "Deluxe", "Villa", "Suite"];
  const filtered = filter === "All" ? ROOMS : ROOMS.filter(r => r.category === filter);

  // Always scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", paddingTop: 80 }}>

      {/* Hero banner */}
      <div style={{ background: COLORS.primary, padding: "70px 32px", textAlign: "center" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: COLORS.white, fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
            ACCOMMODATIONS
          </p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 6vw, 68px)", color: "#F5EFE6", fontWeight: 300, letterSpacing: 3, margin: 0 }}>
            Rooms & Villas
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: COLORS.gold, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            Each accommodation at {HOTEL_NAME} is thoughtfully designed to blend warm hospitality with modern comfort against the backdrop of the Karakoram.
          </p>
        </AnimBlock>
      </div>

      {/* Filter bar (Updated with the new lighter/white theme and burnt-orange active color) */}
      <div style={{ padding: "40px 32px 10px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                padding: "10px 24px", borderRadius: 8, cursor: "pointer",
                border: filter === c ? COLORS.border : "1px solid #E5E5E5",
                background: filter === c ? COLORS.primary : "#FFFFFF",
                color: filter === c ? "#FFFFFF" : "#555555",
                fontFamily: "Lato, sans-serif", fontSize: 12, letterSpacing: 1,
                fontWeight: 700, transition: "all 0.3s",
                boxShadow: filter === c ? "0 4px 12px rgba(152, 74, 28, 0.2)" : "0 2px 5px rgba(0,0,0,0.02)"
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Room grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 90px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
        {filtered.length > 0
          ? filtered.map((room, i) => (
            <RoomCard key={room.id} room={room} setPage={setPage} setRoomId={setRoomId} delay={i * 0.08} />
          ))
          : <p style={{ fontFamily: "Lato, sans-serif", color: "#8C7B6B", gridColumn: "1/-1", textAlign: "center", padding: "60px 0" }}>No rooms in this category.</p>
        }
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}