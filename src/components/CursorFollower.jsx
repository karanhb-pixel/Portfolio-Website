import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/CursorFollower.css";

const CursorFollower = () => {
  const followerRef = useRef(null);

  useGSAP(() => {
    // Setters for position and scale
    const xTo = gsap.quickSetter(followerRef.current, "x", "px");
    const yTo = gsap.quickSetter(followerRef.current, "y", "px");
    const scaleTo = gsap.quickSetter(followerRef.current, "scale");

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Functions to handle the "Grow" effect
    const handleMouseEnter = () => scaleTo(3); // Grow to 3x size
    const handleMouseLeave = () => scaleTo(1); // Return to normal

    window.addEventListener("mousemove", handleMouseMove);

    // Event delegation for dynamic elements
    const handleMouseOver = (e) => {
      const target = e.target.closest("button, a, .btn");
      if (target) {
        handleMouseEnter();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("button, a, .btn");
      const relatedTarget = e.relatedTarget?.closest("button, a, .btn");

      // Only trigger leave if we're moving to a different target or outside any target
      if (target && target !== relatedTarget) {
        handleMouseLeave();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  });

  return <div ref={followerRef} className="cursor-follower" />;
};

export default CursorFollower;
