// components/MultiRoomBookingModal.jsx
import { useState, useMemo } from "react";
import { getRoomVariants } from "../data/rooms.js";
import { submitBookingToSheet, todayStr } from "../config.js";

const formatPKR = (n) =>
  `PKR ${Math.round(n).toLocaleString("en-PK")}`;

export default function MultiRoomBookingModal({
  onClose,
  onSuccess,
  initialQuantities = {},
  primaryRoomId = null,
}) {
  const variants = useMemo(() => getRoomVariants(), []);

  const [quantities, setQuantities] = useState(initialQuantities);
  const [mattresses, setMattresses] = useState({});
  const [showAllRooms, setShowAllRooms] = useState(!primaryRoomId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    checkIn: "",
    checkOut: "",
    adults: "1",
    children: "0",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // Modified to respect max inventory and auto-adjust mattresses
  // if room quantity decreases
  const changeQty = (
    key,
    delta,
    maxInventory,
    roomMaxMattress
  ) => {
    setQuantities((q) => {
      const current = q[key] || 0;
      const next = Math.max(
        0,
        Math.min(maxInventory, current + delta)
      );

      // If we reduce rooms, ensure mattresses don't exceed
      // the new capacity limit
      setMattresses((m) => {
        const currentM = m[key] || 0;
        const maxMForNewQty = next * roomMaxMattress;

        if (currentM > maxMForNewQty) {
          return {
            ...m,
            [key]: maxMForNewQty,
          };
        }

        return m;
      });

      return {
        ...q,
        [key]: next,
      };
    });

    setError("");
  };

  // Mattress limit:
  // Max Mattress Per Room * Quantity of that Room
  const changeMattress = (
    key,
    delta,
    maxPerRow,
    currentQty
  ) => {
    const absoluteMax = maxPerRow * currentQty;

    setMattresses((m) => {
      const next = Math.min(
        absoluteMax,
        Math.max(0, (m[key] || 0) + delta)
      );

      return {
        ...m,
        [key]: next,
      };
    });

    setError("");
  };

  const label = (v) =>
    v.variantLabel
      ? `${v.room.name} (${v.variantLabel})`
      : v.room.name;

  const primaryRoomName = primaryRoomId
    ? (
      variants.find(
        (v) => v.roomId === primaryRoomId
      )?.room.name || "this room"
    )
    : null;

  const visibleVariants = showAllRooms
    ? variants
    : variants.filter(
      (v) => v.roomId === primaryRoomId
    );

  const selectedVariants = useMemo(
    () =>
      variants.filter(
        (v) => (quantities[v.key] || 0) > 0
      ),
    [variants, quantities]
  );

  const totalRooms = selectedVariants.reduce(
    (sum, v) =>
      sum + (quantities[v.key] || 0),
    0
  );

  const nightlyTotal = selectedVariants.reduce(
    (sum, v) => {
      const roomCost =
        (v.price || 0) *
        (quantities[v.key] || 0);

      const mattressCost =
        (v.room.mattressPrice || 0) *
        (mattresses[v.key] || 0);

      return sum + roomCost + mattressCost;
    },
    0
  );

  const nights =
    formData.checkIn && formData.checkOut
      ? Math.max(
        0,
        Math.ceil(
          (new Date(formData.checkOut) -
            new Date(formData.checkIn)) /
          86400000
        )
      )
      : 0;

  const estimatedTotal =
    nights > 0
      ? nightlyTotal * nights
      : nightlyTotal;

  const minCheckOut = formData.checkIn
    ? new Date(
      new Date(formData.checkIn).getTime() +
      86400000
    )
      .toISOString()
      .split("T")[0]
    : todayStr();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitting) return;

    if (selectedVariants.length === 0) {
      setError(
        "Please select at least one room before submitting."
      );
      return;
    }

    // ----------------------------------------------------
    // SMART VALIDATION FOR ADULTS AND MATTRESSES
    // ----------------------------------------------------

    const adults =
      parseInt(formData.adults) || 1;

    const children =
      parseInt(formData.children) || 0;

    let totalBaseCapacity = 0;
    let totalMattressesAdded = 0;
    let maxMattressesAllowed = 0;

    selectedVariants.forEach((v) => {
      const qty = quantities[v.key];

      totalBaseCapacity +=
        v.room.capacity * qty;

      maxMattressesAllowed +=
        v.room.maxMattress * qty;

      totalMattressesAdded +=
        mattresses[v.key] || 0;
    });

    const totalCapacityWithAddedMattresses =
      totalBaseCapacity +
      totalMattressesAdded;

    const absoluteMaxCapacity =
      totalBaseCapacity +
      maxMattressesAllowed;

    // 1. Check if guests completely exceed
    // the physical capacity of chosen rooms
    if (adults > absoluteMaxCapacity) {
      setError(
        `Your selected rooms can only accommodate up to ${absoluteMaxCapacity} adults (including extra mattresses). You have entered ${adults} adults. Please add more rooms.`
      );
      return;
    }

    // 2. Check if they need to manually add
    // the mattress they are trying to fit
    if (
      adults >
      totalCapacityWithAddedMattresses
    ) {
      const needed =
        adults -
        totalCapacityWithAddedMattresses;

      setError(
        `Room base capacity is ${totalBaseCapacity}. For ${adults} adults, please add ${needed} extra mattress(es) using the '+' button above.`
      );
      return;
    }

    // 3. Check Children Policy
    // Max 1 free child per room
    if (children > totalRooms) {
      setError(
        `Only 1 child (under 10 yrs) is free per room. You have ${children} children and ${totalRooms} room(s). Please count extra children as adults or add extra mattresses/rooms.`
      );
      return;
    }

    // ----------------------------------------------------

    setError("");
    setSubmitting(true);

    const roomSummary = selectedVariants
      .map((v) => {
        const mCount =
          mattresses[v.key] || 0;

        const mNote =
          mCount > 0
            ? ` +${mCount} extra mattress${mCount > 1 ? "es" : ""
            }`
            : "";

        return `${label(v)} x${quantities[v.key]
          }${mNote}`;
      })
      .join(", ");

    submitBookingToSheet({
      room: roomSummary,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      adults: formData.adults,
      children: formData.children,
      nights: nights || "",
      roomsCount: totalRooms,
      estimatedTotal:
        estimatedTotal || "",
      submittedAt:
        new Date().toISOString(),
    });

    setSubmitting(false);
    onSuccess();
  };

  return (
    <div className="mrb-overlay">
      <div className="mrb-container">
        <button
          onClick={onClose}
          className="mrb-close-btn"
        >
          ✕
        </button>

        <div className="mrb-content">
          <h2 className="mrb-title">
            Book Your Stay
          </h2>

          <p className="mrb-subtitle">
            {showAllRooms
              ? "Choose any mix of rooms — different types, different quantities — then fill your details once."
              : `Booking the ${primaryRoomName}. Add an extra mattress below if needed, or add other rooms to this same request.`}
          </p>

          {/* ── Step 1: Room selection ────────────────────────── */}
          <p className="mrb-step-title">
            1. Select Rooms
          </p>

          <div className="mrb-rooms-box">
            {visibleVariants.map((v) => {
              const qty =
                quantities[v.key] || 0;

              const mCount =
                mattresses[v.key] || 0;

              const atMaxLimit =
                qty >= v.inventory;

              return (
                <div
                  key={v.key}
                  className="mrb-room-row"
                >
                  <div className="mrb-room-main">
                    <img
                      src={v.room.heroImg}
                      alt={v.room.name}
                      loading="lazy"
                      className="mrb-room-img"
                    />

                    <div className="mrb-room-info">
                      <p className="mrb-room-name">
                        {v.room.name}

                        {v.variantLabel && (
                          <span className="mrb-variant-badge">
                            {v.variantLabel.toUpperCase()}
                          </span>
                        )}
                      </p>

                      <p className="mrb-room-meta">
                        Sleeps {v.room.capacity} ·{" "}
                        {formatPKR(v.price)}
                        /night
                      </p>

                      {atMaxLimit && (
                        <p className="mrb-inventory-alert">
                          Max Available:{" "}
                          {v.inventory}
                        </p>
                      )}
                    </div>

                    <div className="mrb-qty-controls">
                      <button
                        type="button"
                        onClick={() =>
                          changeQty(
                            v.key,
                            -1,
                            v.inventory,
                            v.room.maxMattress
                          )
                        }
                        className="mrb-qty-btn"
                      >
                        −
                      </button>

                      <span className="mrb-qty-text">
                        {qty}
                      </span>

                      <button
                        type="button"
                        disabled={atMaxLimit}
                        onClick={() =>
                          changeQty(
                            v.key,
                            1,
                            v.inventory,
                            v.room.maxMattress
                          )
                        }
                        className="mrb-qty-btn"
                        style={{
                          opacity: atMaxLimit
                            ? 0.3
                            : 1,
                          cursor: atMaxLimit
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Extra mattress */}
                  {qty > 0 &&
                    v.room.maxMattress > 0 && (
                      <div className="mrb-mattress-row">
                        <span className="mrb-mattress-label">
                          + Extra mattress (
                          {formatPKR(
                            v.room.mattressPrice
                          )}
                          /night)
                        </span>

                        <div className="mrb-qty-controls">
                          <button
                            type="button"
                            onClick={() =>
                              changeMattress(
                                v.key,
                                -1,
                                v.room.maxMattress,
                                qty
                              )
                            }
                            className="mrb-qty-btn mrb-mattress-btn"
                          >
                            −
                          </button>

                          <span className="mrb-qty-text mrb-mattress-text">
                            {mCount}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              changeMattress(
                                v.key,
                                1,
                                v.room.maxMattress,
                                qty
                              )
                            }
                            className="mrb-qty-btn mrb-mattress-btn"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* Expand/collapse rooms */}
          {primaryRoomId && (
            <button
              type="button"
              onClick={() =>
                setShowAllRooms((s) => !s)
              }
              className="mrb-expand-btn"
            >
              {showAllRooms
                ? `− Show only ${primaryRoomName}`
                : "+ Add other rooms to this booking"}
            </button>
          )}

          {/* Selection summary */}
          {totalRooms > 0 && (
            <div className="mrb-summary-box">
              <p className="mrb-step-title mrb-summary-title">
                Your Selection (
                {totalRooms} room
                {totalRooms > 1 ? "s" : ""})
              </p>

              {selectedVariants.map((v) => {
                const mCount =
                  mattresses[v.key] || 0;

                return (
                  <div
                    key={v.key}
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    <div className="mrb-summary-row">
                      <p className="mrb-summary-text">
                        {label(v)}{" "}
                        <span
                          style={{
                            color: "#8C7B6B",
                          }}
                        >
                          ×{" "}
                          {quantities[v.key]}
                        </span>
                      </p>

                      <p className="mrb-summary-price">
                        {formatPKR(
                          v.price *
                          quantities[v.key]
                        )}
                        {nights > 0
                          ? " /night"
                          : ""}
                      </p>
                    </div>

                    {mCount > 0 && (
                      <div className="mrb-summary-row">
                        <p className="mrb-summary-subtext">
                          + {mCount} extra mattress
                          {mCount > 1
                            ? "es"
                            : ""}
                        </p>

                        <p className="mrb-summary-subtext">
                          {formatPKR(
                            v.room
                              .mattressPrice *
                            mCount
                          )}
                          {nights > 0
                            ? " /night"
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mrb-total-row">
                <p className="mrb-total-label">
                  Estimated Total
                  {nights > 0
                    ? ` (${nights} night${nights > 1
                      ? "s"
                      : ""
                    })`
                    : ""}
                </p>

                <p className="mrb-total-price">
                  {formatPKR(
                    estimatedTotal
                  )}
                </p>
              </div>

              {nights === 0 && (
                <p className="mrb-total-note">
                  Per-night rate shown —
                  select dates below for
                  full-stay total.
                </p>
              )}
            </div>
          )}

          {/* ── Step 2: Guest details ────────────────────────── */}
          <p className="mrb-step-title">
            2. Your Details
          </p>

          <form
            onSubmit={handleSubmit}
            className="mrb-form"
          >
            <div className="mrb-two-col">
              <div>
                <label className="mrb-input-label">
                  First Name *
                </label>

                <input
                  required
                  className="mrb-input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mrb-input-label">
                  Last Name *
                </label>

                <input
                  required
                  className="mrb-input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mrb-two-col">
              <div>
                <label className="mrb-input-label">
                  Email *
                </label>

                <input
                  required
                  type="email"
                  className="mrb-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mrb-input-label">
                  Contact Number *
                </label>

                <input
                  required
                  className="mrb-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="mrb-input-label">
                WhatsApp Number *
              </label>

              <input
                required
                className="mrb-input"
                name="whatsapp"
                placeholder="with country code"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>

            <div className="mrb-two-col">
              <div>
                <label className="mrb-input-label">
                  Check in Date *
                </label>

                <input
                  required
                  type="date"
                  min={todayStr()}
                  className="mrb-input"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      checkIn:
                        e.target.value,
                      checkOut: "",
                    })
                  }
                />
              </div>

              <div>
                <label className="mrb-input-label">
                  Check out Date *
                </label>

                <input
                  required
                  type="date"
                  min={minCheckOut}
                  className="mrb-input"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  disabled={
                    !formData.checkIn
                  }
                />
              </div>
            </div>

            <div className="mrb-two-col">
              <div>
                <label className="mrb-input-label">
                  Adults *
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  className="mrb-input"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mrb-input-label">
                  Children *{" "}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight:
                        "normal",
                    }}
                  >
                    (Under 10)
                  </span>
                </label>

                <input
                  required
                  type="number"
                  min="0"
                  className="mrb-input"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="mrb-error-box">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mrb-submit-btn"
              style={{
                background: submitting
                  ? "#C9B79A"
                  : "#C49B66",
                cursor: submitting
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {submitting
                ? "Submitting..."
                : totalRooms > 0
                  ? `Request Booking — ${formatPKR(
                    estimatedTotal
                  )}`
                  : "Request Booking"}
            </button>
          </form>
        </div>
      </div>

      {/* MOBILE FRIENDLY CSS STYLES */}
      <style>{`
        .mrb-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
        }

        .mrb-container {
          background: #F9F6F0;
          width: 100%;
          max-width: 620px;
          max-height: 95vh;
          border-radius: 12px;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .mrb-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #fff;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          font-weight: bold;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .mrb-content {
          padding: 30px 24px;
        }

        .mrb-title {
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
          color: #1C1209;
          margin: 0 0 6px;
        }

        .mrb-subtitle {
          font-family: "Lato", sans-serif;
          font-size: 13px;
          color: #8C7B6B;
          margin: 0 0 20px;
          line-height: 1.4;
        }

        .mrb-step-title {
          font-family: "Lato", sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #984A1C;
          font-weight: 700;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .mrb-rooms-box {
          border: 1px solid #EDE6D8;
          border-radius: 8px;
          padding: 4px 14px;
          margin-bottom: 12px;
          background: #FFFFFF;
        }

        .mrb-room-row {
          padding: 14px 0;
          border-bottom: 1px solid #F1ECE1;
        }

        .mrb-room-row:last-child {
          border-bottom: none;
        }

        .mrb-room-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mrb-room-img {
          width: 64px;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .mrb-room-info {
          flex: 1;
          min-width: 0;
        }

        .mrb-room-name {
          margin: 0 0 2px;
          font-family: "Cormorant Garamond", serif;
          font-size: 17px;
          color: #1C1209;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mrb-variant-badge {
          font-family: "Lato", sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #984A1C;
          margin-left: 6px;
          letter-spacing: 0.5px;
          background: #FBF3E6;
          padding: 2px 5px;
          border-radius: 4px;
          vertical-align: middle;
        }

        .mrb-room-meta {
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 12px;
          color: #8C7B6B;
        }

        .mrb-inventory-alert {
          margin: 2px 0 0;
          font-family: "Lato", sans-serif;
          font-size: 10px;
          color: #C0392B;
          font-weight: bold;
        }

        .mrb-qty-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .mrb-qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #C8B49A;
          background: #FFFFFF;
          color: #984A1C;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0;
        }

        .mrb-qty-text {
          min-width: 16px;
          text-align: center;
          font-family: "Lato", sans-serif;
          font-weight: 700;
          color: #1C1209;
        }

        .mrb-mattress-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #EDE6D8;
          margin-left: 76px;
        }

        .mrb-mattress-label {
          font-family: "Lato", sans-serif;
          font-size: 12px;
          color: #8C7B6B;
        }

        .mrb-mattress-btn {
          width: 22px;
          height: 22px;
          font-size: 12px;
        }

        .mrb-mattress-text {
          font-size: 12px;
          min-width: 14px;
        }

        .mrb-expand-btn {
          background: none;
          border: none;
          padding: 0;
          margin-bottom: 20px;
          color: #984A1C;
          font-family: "Lato", sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          text-decoration: underline;
        }

        .mrb-summary-box {
          background: #FBF3E6;
          border: 1px solid #E7D9BE;
          border-radius: 8px;
          padding: 14px 16px;
          margin-bottom: 24px;
        }

        .mrb-summary-title {
          margin: 0 0 8px;
        }

        .mrb-summary-row {
          display: flex;
          justify-content: space-between;
        }

        .mrb-summary-text {
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 14px;
          color: #333;
        }

        .mrb-summary-price {
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 14px;
          color: #555;
        }

        .mrb-summary-subtext {
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 12px;
          color: #8C7B6B;
        }

        .mrb-total-row {
          border-top: 1px solid #E7D9BE;
          margin-top: 10px;
          padding-top: 10px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .mrb-total-label {
          margin: 0;
          font-family: "Lato", sans-serif;
          font-size: 13px;
          color: #1C1209;
          font-weight: 700;
        }

        .mrb-total-price {
          margin: 0;
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
          color: #984A1C;
          font-weight: 700;
        }

        .mrb-total-note {
          margin: 6px 0 0;
          font-family: "Lato", sans-serif;
          font-size: 11px;
          color: #8C7B6B;
          font-style: italic;
        }

        .mrb-form {
          display: grid;
          gap: 14px;
        }

        .mrb-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .mrb-input-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin-bottom: 4px;
          font-family: "Lato", sans-serif;
        }

        .mrb-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #E0D8C8;
          border-radius: 6px;
          font-size: 14px;
          font-family: "Lato", sans-serif;
          outline: none;
          box-sizing: border-box;
          background: #FFF;
          transition: border 0.2s;
        }

        .mrb-input:focus {
          border-color: #C49B66;
        }

        .mrb-error-box {
          font-family: "Lato", sans-serif;
          font-size: 13px;
          color: #721C24;
          background: #F8D7DA;
          border: 1px solid #F5C6CB;
          padding: 10px;
          border-radius: 6px;
          margin: 0;
          line-height: 1.4;
        }

        .mrb-submit-btn {
          width: 100%;
          padding: 14px;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 16px;
          margin-top: 4px;
          transition: background 0.3s;
        }

        /* Mobile Adjustments */
        @media (max-width: 480px) {
          .mrb-overlay {
            padding: 10px;
          }

          .mrb-content {
            padding: 24px 16px;
          }

          .mrb-two-col {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .mrb-mattress-row {
            margin-left: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .mrb-mattress-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}