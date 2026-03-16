import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MagneticButton = ({ children }) => {
  const magneticArea = useRef(null);

  useGSAP(
    () => {
      // quickSetter is used for 60fps performance
      const xTo = gsap.quickSetter(magneticArea.current, "x", "px");
      const yTo = gsap.quickSetter(magneticArea.current, "y", "px");

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } =
          magneticArea.current.getBoundingClientRect();

        // Calculate distance from center
        const x = (clientX - (left + width / 2)) * 0.35;
        const y = (clientY - (top + height / 2)) * 0.35;

        xTo(x);
        yTo(y);
      };

      const handleMouseLeave = () => {
        // Smooth snap back using elastic ease
        gsap.to(magneticArea.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
      };

      magneticArea.current.addEventListener("mousemove", handleMouseMove);
      magneticArea.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        // Clean up listeners to prevent memory leaks
        magneticArea.current?.removeEventListener("mousemove", handleMouseMove);
        magneticArea.current?.removeEventListener(
          "mouseleave",
          handleMouseLeave,
        );
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
