import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function String() {
  const stringRef = useRef(null);
  const initialPath = `M 10 150 Q 400 150 1250 150`;
  const finalPath = `M 10 150 Q 400 150 1250 150`;

  useEffect(() => {
    const stringElement = stringRef.current;
    if (!stringElement) return;

    const handleMouseMove = (event) => {
      const newPath = `M 10 150 Q ${event.clientX} ${event.clientY} 1250 150`;
      gsap.to("svg path", {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)",
      });
    };

    stringElement.addEventListener("mousemove", handleMouseMove);
    stringElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      stringElement.removeEventListener("mousemove", handleMouseMove);
      stringElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="string" ref={stringRef}>
      <svg width="1500" height="350">
        <path d={initialPath} stroke="white" fill="transparent" />
      </svg>
    </div>
  );
}

export default String;
