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

    // Attach listeners to all buttons and links
    const targets = document.querySelectorAll("button, a, .btn");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  });

  return <div ref={followerRef} className="cursor-follower" />;
};

export default CursorFollower;
