// ============================================
// Skarchan RESORTS — BOOKING FORM BACKEND
// Paste this file into: Google Sheet > Extensions > Apps Script
// ============================================

// 👇 CHANGE THIS to the Gmail address that should receive booking emails
const NOTIFY_EMAIL = "your-gmail@gmail.com";

// Name of the sheet tab where bookings will be stored (auto-created)
const SHEET_NAME = "Bookings";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet with headers the first time this runs
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp", "Room", "First Name", "Last Name", "Email", "Phone",
        "WhatsApp", "Check-In", "Check-Out", "Adults", "Children",
        "Nights", "Rooms Count", "Estimated Total (PKR)",
        "Booking Status", "Pending Amount (PKR)"
      ]);
    }

    const estimatedTotal = data.estimatedTotal || "";

    // Save the booking as a new row.
    // Booking Status always starts as "Pending" — after calling the guest
    // to confirm, update this cell manually (e.g. to "Confirmed" or
    // "Cancelled"), and adjust "Pending Amount" as advance payments come in.
    sheet.appendRow([
      new Date(),
      data.room || "",
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      "'" + (data.phone || ""),
      "'" + (data.whatsapp || ""),
      data.checkIn || "",
      data.checkOut || "",
      data.adults || "",
      data.children || "",
      data.nights || "",
      data.roomsCount || "",
      estimatedTotal,
      "Pending",
      estimatedTotal,
    ]);

    // Email the hotel with the booking details
    const subject = `New Booking Request — ${data.room || "Room"} (${data.firstName || ""} ${data.lastName || ""})`;
    const body =
      "New booking received on the Sukoon Resorts website:\n\n" +
      "Room(s): " + (data.room || "-") + "\n" +
      "Rooms Count: " + (data.roomsCount || "-") + "\n" +
      "Name: " + (data.firstName || "") + " " + (data.lastName || "") + "\n" +
      "Email: " + (data.email || "-") + "\n" +
      "Phone: " + (data.phone || "-") + "\n" +
      "WhatsApp: " + (data.whatsapp || "-") + "\n" +
      "Check-In: " + (data.checkIn || "-") + "\n" +
      "Check-Out: " + (data.checkOut || "-") + "\n" +
      "Nights: " + (data.nights || "-") + "\n" +
      "Adults: " + (data.adults || "-") + "\n" +
      "Children: " + (data.children || "-") + "\n" +
      "Estimated Total: " + (estimatedTotal ? "PKR " + estimatedTotal : "-") + "\n" +
      "Booking Status: Pending\n" +
      "Pending Amount: " + (estimatedTotal ? "PKR " + estimatedTotal : "-") + "\n\n" +
      "Please call the guest on the number above to confirm the reservation, then update the Booking Status / Pending Amount in the sheet.";

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you open the /exec URL directly in a browser to check it's alive
function doGet() {
  return ContentService.createTextOutput("Sukoon Resorts booking backend is running.");
}
