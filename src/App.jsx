// App.jsx — Main router with browser back button support
import { useState, useEffect } from "react";
import "./styles.css";

import Navbar         from "./components/Navbar.jsx";
import WhatsAppFAB    from "./components/WhatsAppFAB.jsx";
import HomePage       from "./pages/HomePage.jsx";
import RoomsPage      from "./pages/RoomsPage.jsx";
import RoomDetailPage from "./pages/RoomDetailPage.jsx";
import GalleryPage    from "./pages/GalleryPage.jsx";
import AmenitiesPage  from "./pages/AmenitiesPage.jsx";
import AboutPage      from "./pages/AboutPage.jsx";
import ContactPage    from "./pages/ContactPage.jsx";

export default function App() {
  const [page,   setPage]   = useState("home");
  const [roomId, setRoomId] = useState("standard-hut");

  // ── Browser back/forward button support ──────────────────────
  useEffect(() => {
    // Push initial state on first load
    window.history.replaceState({ page: "home", roomId: "standard-hut" }, "", "/");

    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setPage(e.state.page);
        if (e.state.roomId) setRoomId(e.state.roomId);
        window.scrollTo(0, 0);
      } else {
        setPage("home");
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (p, rid) => {
    const newRoomId = rid || roomId;
    // Push new state into browser history
    window.history.pushState({ page: p, roomId: newRoomId }, "", `/${p === "home" ? "" : p}`);
    setPage(p);
    if (rid) setRoomId(rid);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // setRoomId wrapper that also navigates to room-detail
  const handleSetRoomId = (id) => {
    setRoomId(id);
  };

  return (
    <>
      <Navbar page={page} setPage={navigate} />

      {page === "home"        && <HomePage      setPage={navigate} setRoomId={handleSetRoomId} />}
      {page === "rooms"       && <RoomsPage     setPage={navigate} setRoomId={handleSetRoomId} />}
      {page === "room-detail" && <RoomDetailPage roomId={roomId}   setPage={navigate} setRoomId={handleSetRoomId} />}
      {page === "gallery"     && <GalleryPage   setPage={navigate} />}
      {page === "amenities"   && <AmenitiesPage setPage={navigate} />}
      {page === "about"       && <AboutPage     setPage={navigate} />}
      {page === "contact"     && <ContactPage   setPage={navigate} />}

      <WhatsAppFAB />
    </>
  );
}