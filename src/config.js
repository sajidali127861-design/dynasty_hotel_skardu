// ============================================
// Sehrish Guest House Skardu — SITE CONFIGURATION
// Update these values to customize your site
// ============================================
export const HOTEL_NAME = "Dynasty Hotel Skardu";
export const HOTEL_TAGLINE = "Where the Mountains Meet Timeless Luxury";
export const HOTEL_LOCATION = "Dynasty Skardu, 411, Kushmara Road, Gayool, Skardu";
export const HOTEL_EMAIL = "info@dynastyhotel.com";
export const WHATSAPP_NUMBER = "+923420000164"; // Replace with real number (no + sign)
export const HOTEL_PHONE = "+923420000164";
// ============================================
// GOOGLE APPS SCRIPT — BOOKING FORM BACKEND
// ============================================
// 1. Create a Google Sheet.
// 2. Extensions > Apps Script, paste the code from
//    google-apps-script/Code.gs (included alongside this project).
// 3. Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the deployment URL (ends with /exec) and paste it below.
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyk7-wprW2xZfeLObpRWFGF0ftVY8sOEeuAz6zOo6cm7lMg7cQgL6OqO7gDD9WRJvDT3A/exec";

// Sends a room booking submission to the Google Apps Script backend,
// which appends a row to the Google Sheet and emails the hotel.
//
// This is intentionally "fire and forget": we do NOT await the fetch.
// Apps Script's own execution (writing the row + sending the email)
// can take a few seconds on Google's side, and since mode:"no-cors"
// means the browser can never read the response anyway, waiting for
// it only makes the guest stare at a spinner for no benefit. The
// request is handed to the browser and keeps running in the
// background even after we show the Thank You dialog.
export function submitBookingToSheet(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    console.warn("GOOGLE_SCRIPT_URL is not configured yet in config.js — booking was not saved to the sheet/email.");
    return;
  }
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch(err => console.error("Booking submission failed:", err));
}

// WhatsApp booking message builder
export const buildBookingMessage = (
  roomName,
  checkIn,
  checkOut,
  guests
) => {
  console.log("booking message details:", {
    roomName,
    checkIn,
    checkOut,
    guests,
  });

  const nights =
    checkIn && checkOut
      ? Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
      )
      : null;

  // Detailed booking message
  if (checkIn && checkOut && guests) {
    return `Assalamu Alaikum! 🌿

I would like to make a reservation at ${HOTEL_NAME}.

${roomName ? `🏨 *Room:* ${roomName}\n` : ""}📅 *Check-in:* ${formatDate(checkIn)}
📅 *Check-out:* ${formatDate(checkOut)}
🌙 *Nights:* ${nights}
👥 *Guests:* ${guests}

Could you please confirm availability and share the booking details?

Thank you! 🙏`;
  }

  // Room-only message
  if (roomName) {
    return `Assalamu Alaikum! 🌿

I am interested in booking the *${roomName}* at ${HOTEL_NAME}.

Could you please share availability and pricing details?

Thank you! 🙏`;
  }

  // Default message
  return `Assalamu Alaikum! 🌿

I would like to make a reservation at ${HOTEL_NAME}.

Could you please help me with availability and room options?

Thank you! 🙏`;
};

export const buildGeneralEnquiryMessage = (name, message) => {
  return `Assalamu Alaikum! 🌿

*Name:* ${name || "Guest"}

${message || "I have an enquiry about ."}

Thank you! 🙏`;
};

// Helper: format date nicely
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

// Today's date string for min date on inputs
export function todayStr() {
  return new Date().toISOString().split("T")[0];
}
