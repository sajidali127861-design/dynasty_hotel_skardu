// pages/AmenitiesPage.jsx
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { IMGS } from "../assets/images.js";
import { WHATSAPP_NUMBER, buildBookingMessage } from "../config.js";
import { COLORS } from "../theme/color.js";

const AMENITIES = [
  {
    icon: "🏊",
    title: "Outdoor Swimming Pool",
    desc: "Our signature pool, sculpted to follow the natural landscape, sits at the heart of the resort with breathtaking views of the snow-capped Karakoram. Heated during cooler months, it's open year-round for guests to enjoy the crisp mountain air.",
    img: IMGS.outdoorSwimmingPool,
    from: "left",
  },
  {
    icon: "🍽️",
    title: "Heritage Restaurant",
    desc: "Housed beneath a dramatic circular domed ceiling with amber wall sconces, our restaurant serves authentic Baltistani cuisine alongside continental dishes. Tables are set with handcrafted wooden accents and draped in local linen.",
    img: IMGS.heritageRestaurant,
    from: "right",
  },
  {
    icon: "🚗",
    title: "Airport Transfer",
    desc: "Arrive in comfort. We arrange seamless pickup and drop-off service from Skardu Airport. Share your flight details at booking, and our team will be waiting for you.",
    img: IMGS.airportTransfer,
    from: "left",
  },
  {
    icon: "🔥",
    title: "Bonfire & Stargazing Nights",
    desc: "As the sun falls behind the Karakoram, we light the bonfire. With near-zero light pollution, the Milky Way stretches across the entire sky. Our team sets up seating, local snacks, and hot chai for a truly unforgettable night.",
    img: IMGS.bonfireStargazingNights,
    from: "right",
  },
  {
    icon: "🏔️",
    title: "Guided Mountain Treks",
    desc: "Explore the ancient valleys and towering peaks with our expert local guides. From gentle morning hikes to multi-day K2 base camp treks, we connect you to this extraordinary landscape at your own pace.",
    img: IMGS.guidedMountainTreks,
    from: "left",
  },
  {
    icon: "🧘",
    title: "Wellness & Meditation",
    desc: "Begin your mornings with guided yoga on our open terraces as the mountain mist rises. Our wellness programme draws from local Baltistani tradition — breathing, stillness, and the healing power of altitude and silence.",
    img: IMGS.wellnessMeditation,
    from: "right",
  },
];

export default function AmenitiesPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>

      {/* Header */}
      <div style={{ background: COLORS.primary, padding: "70px 32px", textAlign: "center" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: COLORS.white }}>RESORT EXPERIENCES</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 6vw, 68px)", color: "#F5EFE6", fontWeight: 300, letterSpacing: 3 }}>
            Amenities & Facilities
          </h1>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: COLORS.gold, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            Beyond exceptional rooms, Taaj Residence Skardu offers a curated collection of experiences rooted in the landscape and culture of Gilgit-Baltistan.
          </p>
        </AnimBlock>
      </div>

      {/* Quick icons strip */}
      <div style={{ padding: "40px 32px", borderBottom: "1px solid #C8B49A" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
          {AMENITIES.map(({ icon, title }) => (
            <div key={title} style={{ textAlign: "center", minWidth: 90 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 10, letterSpacing: 1, color: "#7A6652", margin: 0 }}>{title.toUpperCase().split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alternating content blocks */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 32px" }}>
        {AMENITIES.map(({ icon, title, desc, img, from }, i) => (
          <div
            key={title}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64, alignItems: "center", marginBottom: i < AMENITIES.length - 1 ? 90 : 0,
            }}
          >
            {from === "left" ? (
              <>
                <AnimBlock from="left">
                  <div>
                    <div style={{ fontSize: 38, marginBottom: 14 }}>{icon}</div>
                    <div className="gold-divider" />
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 3vw, 38px)", color: "#1C1209", margin: "0 0 18px", fontWeight: 400 }}>
                      {title}
                    </h2>
                    <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#7A6652", lineHeight: 1.9 }}>{desc}</p>
                  </div>
                </AnimBlock>
                <AnimBlock from="right">
                  <img src={img} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center", boxShadow: "6px 6px 0 #C9922A", background: "#EDE0CE" }} />
                </AnimBlock>
              </>
            ) : (
              <>
                <AnimBlock from="left">
                  <img src={img} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center", boxShadow: "-6px 6px 0 #C4922A", background: "#EDE0CE" }} />
                </AnimBlock>
                <AnimBlock from="right">
                  <div>
                    <div style={{ fontSize: 38, marginBottom: 14 }}>{icon}</div>
                    <div className="gold-divider" />
                    <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 3vw, 38px)", color: "#1C1209", margin: "0 0 18px", fontWeight: 400 }}>
                      {title}
                    </h2>
                    <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#7A6652", lineHeight: 1.9 }}>{desc}</p>
                  </div>
                </AnimBlock>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#EDE0CE", padding: "70px 32px", textAlign: "center" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center" }}>PLAN YOUR STAY</p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 4vw, 48px)", color: "#1C1209", margin: "0 0 14px", fontWeight: 400 }}>
            Experience It All at Sukoon
          </h2>
          <p style={{ fontFamily: "Lato, sans-serif", fontSize: 14, color: "#8C7B6B", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.8 }}>
            Reach out to our team on WhatsApp to arrange a bespoke package that includes all the experiences you desire.
          </p>
          <button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`, "_blank")}
            className="btn-whatsapp"
            style={{ margin: "0 auto" }}
          >
            📱 PLAN MY STAY
          </button>
        </AnimBlock>
      </div>

      <Footer setPage={setPage} />

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
