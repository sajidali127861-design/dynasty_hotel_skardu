// pages/AboutPage.jsx
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { IMGS } from "../assets/images.js";
import { COLORS } from "../theme/color.js";
import { HOTEL_NAME } from "../config.js";

export default function AboutPage({ setPage }) {
  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", paddingTop: 80 }}>

      {/* Hero */}
      <div style={{ background: COLORS.primary, position: "relative", height: "52vh", minHeight: 360 }}>
        {/* <img src={IMGS.aboutimage1} alt="Skarchan Resorts aerial" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", background: "#EDE0CE" }} /> */}
        <div style={{ position: "absolute", inset: 0, background: COLORS.primary }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px" }}>
          <div>
            <p className="section-label" style={{ textAlign: "center", color: COLORS.white }}>OUR STORY</p>
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 6vw, 72px)", color: "#F5EFE6", fontWeight: 300, letterSpacing: 3, margin: 0 }}>
              About {HOTEL_NAME}
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 32px" }}>
        <AnimBlock>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4vw, 46px)", color: "#1C1209", textAlign: "center", fontWeight: 400, margin: "0 0 0" }}>
            Born From the Mountains
          </h2>
          <div className="gold-divider--center gold-divider" style={{ display: "block" }} />
          {[
            `${HOTEL_NAME} was built with one vision: to create a place where travellers can find true sukoon — peace — in the cradle of the world's mightiest mountain range.`,

            `Located in Skardu, Gilgit-Baltistan, our property offers comfortable, welcoming stays with warm hospitality, mountain views, and a genuine sense of local charm.`,

            `We believe that luxury and authenticity are not opposites. Every corner of ${HOTEL_NAME} is designed to make guests feel at home while still enjoying the beauty and comfort of a memorable Skardu getaway.`,

            `We are committed to sustainable, community-rooted hospitality — employing local craftsmen, sourcing ingredients from nearby farms, and preserving the integrity of this sacred landscape for generations to come.`,

          ].map((para, i) => (
            <AnimBlock key={i} delay={i * 0.1}>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: 16, color: "#7A6652", lineHeight: 1.9, marginBottom: 22, textAlign: "center" }}>{para}</p>
            </AnimBlock>
          ))}
        </AnimBlock>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 60 }}>
          {[["6+", "Room Types"], ["3 kanal", "Resort Grounds"], ["Skardu", "GB, Pakistan"]].map(([num, label]) => (
            <AnimBlock key={label}>
              <div style={{ textAlign: "center", padding: "32px 16px", border: "1px solid #C8B49A", background: "#EEE5D6" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 40, color: "#C4922A", margin: "0 0 8px", fontWeight: 700 }}>{num}</p>
                <p style={{ fontFamily: "Lato, sans-serif", fontSize: 11, letterSpacing: 2, color: "#7A6652", margin: 0, textTransform: "uppercase" }}>{label}</p>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>

      {/* Two-column story + image */}
      <section style={{ background: "#EDE0CE", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <AnimBlock from="left">
            <img src={IMGS.heritageRestaurant} alt="Heritage fort exterior" loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", boxShadow: "6px 6px 0 #C9922A", background: "#EDE0CE" }} />
          </AnimBlock>
          <AnimBlock from="right">
            <p className="section-label">OUR DESIGN PHILOSOPHY</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 3vw, 40px)", color: "#1C1209", margin: "0 0 0", fontWeight: 400 }}>
              Heritage Meets Hospitality
            </h2>
            <div className="gold-divider" />
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#7A6652", lineHeight: 1.9, marginBottom: 18 }}>
              Inspired by the ancient forts and circular dwelling traditions of Baltistan, our architects worked closely with local artisans to design each structure from the ground up.
            </p>
            <p style={{ fontFamily: "Lato, sans-serif", fontSize: 15, color: "#7A6652", lineHeight: 1.9 }}>
              The result is a resort that does not sit on the landscape — it grows from it. Stone walls, earthen plaster, dark timber, and warm amber lighting create a harmony between shelter and sky that you have to experience to fully understand.
            </p>
          </AnimBlock>
        </div>
      </section>

      <Footer setPage={setPage} />

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
