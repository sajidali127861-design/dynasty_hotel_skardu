// pages/HomePage.jsx
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Footer from "../components/Footer.jsx";
import { IMGS } from "../assets/images.js";
import { ROOMS } from "../data/rooms.js";
import { COLORS } from "../theme/color.js";
import { HOTEL_NAME, HOTEL_LOCATION, WHATSAPP_NUMBER, buildBookingMessage } from "../config.js";

// ── Official WhatsApp SVG Icon ────────────────────────────────
const WhatsAppIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
      fill={color}
    />
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      fill="#25D366"
    />
  </svg>
);

// ── Section Divider (golden fade, no solid line) ──────────────
const GoldenDivider = () => (
  <div style={{
    height: 1,
    background: "linear-gradient(to right, transparent 0%, #C9922A 30%, #D9A84E 50%, #C9922A 70%, transparent 100%)",
    opacity: 0.35,
    margin: 0,
  }} />
);

// ── Hero Section ──────────────────────────────────────────────
// ── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const [slide, setSlide] = useState(0);
  const slides = [IMGS.hero01, IMGS.hero03, IMGS.hero02];

  useEffect(() => {
    const t = setInterval(() => {
      setSlide(s => (s + 1) % slides.length);
    }, 5500);

    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "clamp(550px, 85vh, 800px)",
        overflow: "hidden",
      }}
    >
      {slides.map((src, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center 65%",
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? "scale(1.04)" : "scale(1)",
            transition: "opacity 1.3s ease, transform 7s ease",
          }}
        />
      ))}

      {/* Dark overlay for better text visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.55) 100%
          )`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(32px, 6vw, 76px)",
            color: COLORS.white,
            fontWeight: 300,
            letterSpacing: 1,
            lineHeight: 1.2,
            margin: "0 0 16px",
            animation: "fadeUp 1.2s ease 0.3s both",
            textShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
        </h1>

        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "clamp(20px, 3vw, 30px)",
            color: COLORS.white,
            letterSpacing: 4,
            textTransform: "uppercase",
            animation: "fadeUp 1s ease 1s both",
            textShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          }}
        >
          A Heritage Retreat in Skardu Valley
        </p>
      </div>
    </section>
  );
}

// ── Quick Booking Bar ─────────────────────────────────────────
// ── Quick Booking Bar ─────────────────────────────────────────
function QuickBookBar() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const [errors, setErrors] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const handleCheckAvailability = () => {
    const newErrors = {
      checkIn: "",
      checkOut: "",
      guests: "",
    };

    let hasError = false;

    // Check-in validation
    if (!checkIn) {
      newErrors.checkIn = "Please select check-in date";
      hasError = true;
    }

    // Check-out validation
    if (!checkOut) {
      newErrors.checkOut = "Please select check-out date";
      hasError = true;
    }

    // Guest validation
    if (!guests) {
      newErrors.guests = "Please select number of guests";
      hasError = true;
    }

    // Check checkout is after check-in
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out must be after check-in";
        hasError = true;
      }
    }

    setErrors(newErrors);

    // Don't proceed if validation failed
    if (hasError) {
      return;
    }

    // Build WhatsApp message with actual values
    const message = buildBookingMessage(
      null,       // roomName
      checkIn,
      checkOut,
      guests
    );

    // Open WhatsApp only after successful validation
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        maxWidth: 1050,
        margin: "40px auto",
        position: "relative",
        zIndex: 10,
      }}
    >
      <AnimBlock>
        <div
          style={{
            background: COLORS.white,
            borderRadius: 12,
            padding: "24px 32px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Check-in */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Check-in
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  checkIn: "",
                }));
              }}
              style={{
                padding: "12px 16px",
                border: `1px solid ${errors.checkIn ? "#dc2626" : COLORS.border
                  }`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            {errors.checkIn && (
              <span
                style={{
                  color: "#dc2626",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {errors.checkIn}
              </span>
            )}
          </div>

          {/* Check-out */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Check-out
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  checkOut: "",
                }));
              }}
              style={{
                padding: "12px 16px",
                border: `1px solid ${errors.checkOut ? "#dc2626" : COLORS.border
                  }`,
                borderRadius: 8,
                color: COLORS.textPrimary,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            {errors.checkOut && (
              <span
                style={{
                  color: "#dc2626",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {errors.checkOut}
              </span>
            )}
          </div>

          {/* Guests */}
          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: 13,
                color: COLORS.textSecondary,
                marginBottom: 8,
                fontWeight: 700,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Guests
            </label>

            <select
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  guests: "",
                }));
              }}
              style={{
                padding: "12px 16px",
                border: `1px solid ${errors.guests ? "#dc2626" : COLORS.border
                  }`,
                borderRadius: 8,
                color: guests ? COLORS.textPrimary : "#777",
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                background: COLORS.white,
                cursor: "pointer",
              }}
            >
              <option value="">Select guests</option>
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3 Guests">3 Guests</option>
              <option value="4+ Guests">4+ Guests</option>
            </select>

            {errors.guests && (
              <span
                style={{
                  color: "#dc2626",
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {errors.guests}
              </span>
            )}
          </div>

          {/* Check Availability */}
          <div
            style={{
              flex: "1 1 200px",
            }}
          >
            <button
              onClick={handleCheckAvailability}
              style={{
                width: "100%",
                padding: "13px 24px",
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "Lato, sans-serif",
                cursor: "pointer",
                transition: "background 0.3s",
                height: 47,
              }}
            >
              Check Availability
            </button>
          </div>
        </div>
      </AnimBlock>
    </div>
  );
}
// ── Welcome Block ─────────────────────────────────────────────
// ── Welcome Block ─────────────────────────────────────────────
function WelcomeSection() {
  return (
    <>
      <section
        style={{
          background: COLORS.white,
          padding: "80px 32px 60px",
        }}
      >
        <div
          style={{
            maxWidth: 1050,
            margin: "0 auto",
          }}
        >
          <AnimBlock>
            <div
              style={{
                textAlign: "center",
                maxWidth: 850,
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(34px, 5vw, 54px)",
                  color: COLORS.textPrimary,
                  margin: "0 0 10px",
                  fontWeight: "bold",
                }}
              >
                Welcome to {HOTEL_NAME}
              </h2>

              <h3
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  color: COLORS.primary,
                  margin: "0 0 24px",
                  fontWeight: "bold",
                }}
              >
                Experience the Serenity of the North
              </h3>

              <div
                className="gold-divider"
                style={{
                  margin: "0 auto 24px",
                }}
              />

              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Welcome our guests to {HOTEL_NAME} located in the
                heart of Skardu. Nestled amidst the majestic Karakoram peaks,
                our retreat offers a perfect blend of traditional Baltistani
                heritage and modern comfort. Let nature be your sanctuary.
              </p>
            </div>
          </AnimBlock>

          <QuickBookBar />

          <AnimBlock delay={0.2}>
            <div
              style={{
                overflow: "hidden",
                borderRadius: 12,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                marginTop: 20,
              }}
            >
              <img
                src={IMGS.main}
                alt={`Welcome to ${HOTEL_NAME}`}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "21/9",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </AnimBlock>
        </div>
      </section>

      <GoldenDivider />
    </>
  );
}

export function FeaturedRooms({ setPage, setRoomId }) {
  const animationDirs = ["slideInLeft", "fadeUp", "slideInRight"];

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px" }}>
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              Accommodations
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(30px, 4vw, 50px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Featured Rooms & Villas
            </h2>
          </div>
        </AnimBlock>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            overflow: "hidden",
          }}
        >
          {ROOMS.slice(0, 3).map((room, i) => (
            <div
              key={room.id}
              style={{
                animation: `${animationDirs[i]} 0.8s ease ${i * 0.2}s both`,
              }}
            >
              <RoomCard room={room} setPage={setPage} setRoomId={setRoomId} delay={0} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            onClick={() => {
              setPage("rooms");
              window.scrollTo(0, 0);
            }}
            style={{
              background: "transparent",
              color: COLORS.primary,
              border: `1.5px solid ${COLORS.primary}`,
              padding: "12px 32px",
              fontFamily: "Lato, sans-serif",
              fontSize: 12,
              letterSpacing: "0.15em",
              fontWeight: 600,
              borderRadius: 30,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.primary;
              e.currentTarget.style.color = COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = COLORS.primary;
            }}
          >
            VIEW ALL ROOMS
          </button>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── Dining / Experience Highlight ─────────────────────────────
export function DiningHighlight() {
  const highlights = [
    "A beautifully crafted dining space with panoramic views of the Karakoram peaks.",
    "Floor-to-ceiling windows enhancing your dining experience with natural mountain light.",
    "Perfect for intimate meals and larger gatherings, offering traditional Balti cuisine.",
  ];

  return (
    <>
      <section
        style={{
          background: COLORS.white,
          padding: "clamp(50px, 8vw, 90px) clamp(20px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px, 5vw, 60px)",
            alignItems: "center",
          }}
        >
          <AnimBlock from="left">
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 10,
                fontWeight: 600,
              }}
            >
              What Awaits You
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(26px, 4vw, 42px)",
                color: COLORS.textPrimary,
                margin: "0 0 24px",
                lineHeight: 1.25,
                fontWeight: 400,
              }}
            >
              Heritage Culinary Experience at {HOTEL_NAME}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {highlights.map((text, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span
                    style={{
                      color: COLORS.primary,
                      fontSize: 16,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    ✦
                  </span>
                  <p
                    style={{
                      fontFamily: "Lato, sans-serif",
                      fontSize: 15,
                      color: COLORS.textSecondary,
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </AnimBlock>

          <AnimBlock from="right">
            <img
              src={IMGS.heritageRestaurant}
              alt="Heritage Restaurant"
              loading="lazy"
              style={{
                width: "100%",
                borderRadius: 12,
                boxShadow: "0 14px 34px rgba(28, 18, 9, 0.08)",
                border: `1px solid ${COLORS.lightBorder}`,
                objectFit: "cover",
                aspectRatio: "4/3",
                display: "block",
              }}
            />
          </AnimBlock>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── All-Inclusive Amenities ───────────────────────────────────
export function AmenitiesStrip() {
  const items = [
    ["📡", "COMPLIMENTARY WI-FI"],
    ["🚗", "FREE PARKING"],
    ["🍽️", "ON-SITE RESTAURANT"],
    ["🛎️", "ROOM SERVICE"],
    ["🏔️", "GUIDED TOURS"],
    ["🔥", "BONFIRE NIGHTS"],
  ];

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px" }}>
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: 12,
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              Resort Facilities
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              All-Inclusive Amenities
            </h2>
          </div>
        </AnimBlock>

        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {items.map(([icon, title], i) => (
            <AnimBlock key={title} delay={i * 0.05}>
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 10,
                  padding: "32px 16px",
                  textAlign: "center",
                  boxShadow: "0 4px 16px rgba(28, 18, 9, 0.03)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(28, 18, 9, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(28, 18, 9, 0.03)";
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    marginBottom: 14,
                    lineHeight: 1,
                  }}
                >
                  {icon}
                </div>
                <h4
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: COLORS.textPrimary,
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h4>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── Booking.com Style Multi-Card Carousel Grid Layout ──────────────────
export function BookingReviews() {
  const [startIndex, setStartIndex] = useState(0);

  // ── Direct URL for Taaj Residence Skardu Reviews ──────────────────
  const bookingUrl =
    "https://www.booking.com/hotel/pk/sony-amp-resturant.en-gb.html?aid=356980&label=gog235jc-10CAsotQFCEnNvbnktYW1wLXJlc3R1cmFudEgJWANotQGIAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4Ap-o6dUGwAIB0gIkZWJmY2Q3OGUtNTc2My00MGExLWJkN2ItMDk4NDMxZTdhZGFk2AIB4AIB&sid=b5f385d32b293f536e8c4f1197562c17&all_sr_blocks=742085101_376227474_2_1_0&checkin=2026-10-08&checkout=2026-10-09&dest_id=-2774916&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=742085101_376227474_2_1_0&hpos=1&matching_block_id=742085101_376227474_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=742085101_376227474_2_1_0__1750000&srepoch=1790596137&srpvid=c32a5310ba2f0a72&type=total&ucfs=1&#tab-reviews";

  // ── All Reviews Extracted Directly From Your Screenshots ──────────
  const reviews = [
    {
      name: "Muhammad",
      country: "Pakistan",
      flag: "🇵🇰",
      date: "October 21, 2023",
      score: "9.0",
      title: "Superb",
      positive:
        "Beautiful ambiance, neat and clean room. Room service was on point. Best part was the availability of hot water.",
      negative: null,
      avatarImg: null,
      avatarColor: "#2F5D48",
      initial: "M",
      roomType: "Deluxe Double Room",
      stayDetails: "1 night · October 2023 · Family",
    },
    {
      name: "Mitchell",
      country: "Australia",
      flag: "🇦🇺",
      date: "October 25, 2024",
      score: "8.0",
      title: "Very good",
      positive:
        "The food is absolutely delicious, and they staff once again go out of there way to make your stay the best it can be. The location is kind of in the middle of no where",
      negative: null,
      avatarImg: null,
      avatarColor: "#29A8E0", // Blue circle avatar from screenshot
      initial: "M",
      roomType: "Deluxe Double Room",
      stayDetails: "2 nights · October 2024 · Solo traveller",
    },
    {
      name: "Muhammad",
      country: "Pakistan",
      flag: "🇵🇰",
      date: "September 21, 2024",
      score: "8.0",
      title: "Very good",
      positive: "Its clean and the staff is very friendly",
      negative: "The wifi was pathetic",
      avatarImg: null,
      avatarColor: "#3B6978",
      initial: "M",
      roomType: "Deluxe Double Room",
      stayDetails: "2 nights · September 2024",
    },
    {
      name: "Raza",
      country: "Germany",
      flag: "🇩🇪",
      date: "November 5, 2025",
      score: "8.0",
      title: "Super war",
      positive:
        "Das Hotel war eine ruhige Ort und sauber und die Service war sehr nett",
      negative: "Alles war gut 👍",
      avatarImg: null,
      avatarColor: "#606C38",
      initial: "R",
      roomType: "Deluxe Double Room",
      stayDetails: "7 nights · October 2025 · Family",
    },
    {
      name: "Basma",
      country: "Germany",
      flag: "🇩🇪",
      date: "June 21, 2024",
      score: "8.0",
      title: "Meilleur choix à côté de l'aéroport!",
      positive:
        "Un fabuleux jardin, la bonne nourriture au restaurant, un grand merci pour le transfert à l'aéroport gratuit!",
      negative:
        "La mauvaise connection internet dans notre villa, sinon tout était correct.",
      avatarImg: null,
      avatarColor: "#2A6F97",
      initial: "B",
      roomType: "Superior Double Room",
      stayDetails: "1 night · June 2024 · Couple",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [startIndex]);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const getDisplaySet = () => {
    let out = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      out.push(reviews[(startIndex + i) % reviews.length]);
    }
    return out;
  };

  const openBookingReviews = () => {
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 85px) 32px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>

          {/* Header Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={IMGS?.hero02 || "/hotel-thumb.jpg"}
                alt={HOTEL_NAME}
                loading="lazy"
                style={{
                  width: "88px",
                  height: "62px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: `1px solid ${COLORS.lightBorder}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    margin: "0 0 4px",
                  }}
                >
                  {HOTEL_NAME}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "2px", color: COLORS.booking, fontSize: "14px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                  <span
                    style={{
                      background: COLORS.booking,
                      color: COLORS.white,
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    9.3 / 10
                  </span>
                  <p style={{ fontFamily: "Lato, sans-serif", fontSize: "13px", color: COLORS.textSecondary, margin: 0 }}>
                    Verified Booking.com Guest Reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Open Button */}
            <button
              onClick={openBookingReviews}
              style={{
                background: COLORS.white,
                border: `1.5px solid ${COLORS.textPrimary}`,
                borderRadius: "30px",
                padding: "10px 28px",
                fontFamily: "Lato, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: COLORS.textPrimary,
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.textPrimary;
                e.currentTarget.style.color = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.white;
                e.currentTarget.style.color = COLORS.textPrimary;
              }}
            >
              Write / View Reviews on Booking.com
            </button>
          </div>

          {/* Carousel Slider */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>

            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              style={{
                position: "absolute",
                left: "-18px",
                zIndex: 12,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                cursor: "pointer",
                fontSize: "22px",
                color: COLORS.textPrimary,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ‹
            </button>

            {/* Review Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%" }}>
              {getDisplaySet().map((rev, idx) => (
                <div
                  key={idx}
                  onClick={openBookingReviews}
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "18px",
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "310px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.03)";
                  }}
                >
                  <div>
                    {/* Top Row: Avatar & Official Booking Score Pill */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: rev.avatarColor,
                            color: COLORS.white,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 700,
                            fontSize: "16px",
                            fontFamily: "Lato, sans-serif",
                          }}
                        >
                          {rev.initial}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontFamily: "Lato, sans-serif", fontSize: "15px", fontWeight: 700, color: COLORS.textPrimary }}>
                            {rev.name}
                          </h4>
                          <p style={{ margin: "2px 0 0", fontFamily: "Lato, sans-serif", fontSize: "12px", color: COLORS.textLight }}>
                            {rev.flag} {rev.country}
                          </p>
                        </div>
                      </div>

                      {/* Official Booking.com Blue Score Badge */}
                      <div
                        style={{
                          background: COLORS.booking,
                          color: COLORS.white,
                          fontWeight: 700,
                          padding: "4px 9px",
                          borderRadius: "6px 6px 6px 0px",
                          fontSize: "13px",
                          fontFamily: "Lato, sans-serif",
                          boxShadow: "0 2px 6px rgba(0, 59, 149, 0.25)",
                        }}
                      >
                        {rev.score}
                      </div>
                    </div>

                    {/* Room Category & Stay Details */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontFamily: "Lato, sans-serif",
                        color: COLORS.textMuted,
                        marginBottom: "12px",
                      }}
                    >
                      <span>🛏️ {rev.roomType}</span> • <span>{rev.stayDetails}</span>
                    </div>

                    {/* Review Title */}
                    <h5
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: COLORS.textPrimary,
                        lineHeight: 1.25,
                      }}
                    >
                      "{rev.title}"
                    </h5>

                    {/* Review Positive Feedback */}
                    <p
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "13.5px",
                        color: COLORS.textSecondary,
                        lineHeight: "1.6",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {rev.positive}
                    </p>
                  </div>

                  {/* Card Bottom: Date & Direct Link */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "18px",
                      borderTop: `1px solid ${COLORS.lightBorder}`,
                      paddingTop: "12px",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontFamily: "Lato, sans-serif", color: COLORS.textLight }}>
                      {rev.date}
                    </span>
                    <span
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontSize: "11px",
                        color: COLORS.primary,
                        fontWeight: 700,
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      Read full review on Booking.com →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next review"
              style={{
                position: "absolute",
                right: "-18px",
                zIndex: 12,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                cursor: "pointer",
                fontSize: "22px",
                color: COLORS.textPrimary,
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              ›
            </button>
          </div>

        </div>
      </section>
      <GoldenDivider />
    </>
  );
}
// ── 📍 Location Section ───────────────────────────────────────
export function LocationSection() {
  // ── Exact Google Maps URLs for Dynasty Hotel Skardu ──────────
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Dynasty+Hotel+Skardu+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const directMapUrl =
    "https://www.google.com/maps/search/?api=1&query=Dynasty+Hotel+Skardu+Pakistan";

  return (
    <>
      <section
        style={{
          background: COLORS.white,
          padding: "clamp(60px, 8vw, 90px) 32px",
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: COLORS.gold,
                textTransform: "uppercase",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              Explore Skardu
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                color: COLORS.textPrimary,
                fontWeight: 400,
                margin: 0,
              }}
            >
              Our Mountain Sanctuary
            </h2>
            <div
              style={{
                width: "48px",
                height: "2px",
                background: COLORS.primary,
                margin: "14px auto 0",
              }}
            />
            <p
              style={{
                fontFamily: "Lato, sans-serif",
                fontSize: "14px",
                color: COLORS.textSecondary,
                marginTop: "16px",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              📍 <strong style={{ color: COLORS.textPrimary }}>Dynasty Hotel, Skardu</strong>
              <span style={{ display: "block", marginTop: "4px", fontSize: "13px" }}>
                Skardu, Gilgit-Baltistan, Pakistan
              </span>
            </p>

            <button
              onClick={() => window.open(directMapUrl, "_blank")}
              style={{
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                borderRadius: "30px",
                padding: "12px 30px",
                fontFamily: "Lato, sans-serif",
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(28, 18, 9, 0.15)",
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
              🗺️ Open in Google Maps
            </button>
          </div>

          <AnimBlock>
            <div
              style={{
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(28, 18, 9, 0.06)",
                border: `1px solid ${COLORS.border}`,
                height: "460px",
                width: "100%",
              }}
            >
              <iframe
                title="Dynasty Hotel Skardu Accurate Location"
                src={mapEmbedUrl}
                style={{ width: "100%", height: "100%", border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimBlock>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

// ── WhatsApp CTA Banner ───────────────────────────────────────
export function CTABanner() {
  return (
    <section style={{ background: COLORS.background, padding: "clamp(60px, 8vw, 90px) 32px", textAlign: "center" }}>
      <AnimBlock>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            color: COLORS.textPrimary,
            fontWeight: 400,
            margin: "0 0 16px",
          }}
        >
          Ready to Reserve Your Stay?
        </h2>
        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "15px",
            color: COLORS.textSecondary,
            maxWidth: 520,
            margin: "0 auto 36px",
            lineHeight: 1.8,
          }}
        >
          Let the Karakoram welcome you. Connect with our dedicated hosts on WhatsApp for instant booking, custom itineraries, and personalised hospitality.
        </p>
        <button
          onClick={() =>
            window.open(
              `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`,
              "_blank"
            )
          }
          style={{
            background: COLORS.whatsapp,
            color: COLORS.white,
            border: "none",
            padding: "14px 34px",
            borderRadius: "50px",
            fontFamily: "Lato, sans-serif",
            fontSize: "14px",
            letterSpacing: "0.06em",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 24px rgba(37, 211, 102, 0.28)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 211, 102, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 211, 102, 0.28)";
          }}
        >
          <WhatsAppIcon size={20} color={COLORS.white} />
          Book via WhatsApp
        </button>
      </AnimBlock>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────
export default function HomePage({ setPage, setRoomId }) {
  return (
    <div>
      <HeroSection />
      <WelcomeSection />
      <FeaturedRooms setPage={setPage} setRoomId={setRoomId} />
      <DiningHighlight />
      <AmenitiesStrip />
      <BookingReviews />
      <LocationSection />
      <CTABanner />
      <Footer setPage={setPage} />
    </div>
  );
}