// AnimBlock.jsx — Scroll-triggered animation wrapper
import { useState, useEffect, useRef } from "react";

export default function AnimBlock({ children, from = "bottom", delay = 0, threshold = 0.12 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const transforms = {
    bottom: "translateY(40px)",
    left:   "translateX(-50px)",
    right:  "translateX(50px)",
    up:     "translateY(-30px)",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : (transforms[from] || transforms.bottom),
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
