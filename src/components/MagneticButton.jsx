import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MagneticButton = ({ children }) => {
  const magneticArea = useRef(null);

  useGSAP(
    () => {
      const el = magneticArea.current;
      if (!el) return;

      // quickSetter is used for 60fps performance
      const xTo = gsap.quickSetter(el, "x", "px");
      const yTo = gsap.quickSetter(el, "y", "px");

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = el.getBoundingClientRect();

        // Calculate distance from center
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;

        xTo(x);
        yTo(y);
      };

      const handleMouseLeave = () => {
        // Smooth snap back using elastic ease
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        // Clean up listeners to prevent memory leaks
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: magneticArea },
  );

  return (
    <div ref={magneticArea} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
};

export default MagneticButton;
