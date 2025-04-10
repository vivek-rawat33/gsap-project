// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";

// function String() {
//   const stringRef = useRef(null);
//   const initialPath = `M 10 150 Q 400 150 1250 150`;
//   const finalPath = `M 10 150 Q 400 150 1250 150`;

//   useEffect(() => {
//     const stringElement = stringRef.current;
//     if (!stringElement) return;

//     const handleMouseMove = (event) => {
//       const newPath = `M 10 150 Q ${event.clientX} ${event.clientY} 1250 150`;
//       gsap.to("svg path", {
//         attr: { d: newPath },
//         duration: 0.3,
//         ease: "power3.out",
//       });
//     };

//     const handleMouseLeave = () => {
//       gsap.to("svg path", {
//         attr: { d: finalPath },
//         duration: 1.5,
//         ease: "elastic.out(1,0.2)",
//       });
//     };

//     stringElement.addEventListener("mousemove", handleMouseMove);
//     stringElement.addEventListener("mouseleave", handleMouseLeave);

//     // Cleanup event listeners on component unmount
//     return () => {
//       stringElement.removeEventListener("mousemove", handleMouseMove);
//       stringElement.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div className="string" ref={stringRef}>
//       <svg width="1500" height="350">
//         <path d={initialPath} stroke="white" fill="transparent" />
//       </svg>
//     </div>
//   );
// }

// export default String;

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function String() {
  const stringRef = useRef(null);
  const pathRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200); // default

  useEffect(() => {
    const updateWidth = () => {
      if (stringRef.current) {
        setContainerWidth(stringRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    const stringElement = stringRef.current;
    if (!stringElement || !pathRef.current) return;

    const handleMouseMove = (event) => {
      const bounds = stringElement.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const newPath = `M 10 150 Q ${x} ${y} ${containerWidth - 10} 150`;

      gsap.to(pathRef.current, {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      const resetPath = `M 10 150 Q ${containerWidth / 2} 150 ${
        containerWidth - 10
      } 150`;

      gsap.to(pathRef.current, {
        attr: { d: resetPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.2)",
      });
    };

    stringElement.addEventListener("mousemove", handleMouseMove);
    stringElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stringElement.removeEventListener("mousemove", handleMouseMove);
      stringElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerWidth]);

  const defaultPath = `M 10 150 Q ${containerWidth / 2} 150 ${
    containerWidth - 10
  } 150`;

  return (
    <div ref={stringRef} className="w-full max-w-full overflow-hidden px-4">
      <svg viewBox={`0 0 ${containerWidth} 300`} width="100%" height="300">
        <path
          ref={pathRef}
          d={defaultPath}
          stroke="white"
          fill="transparent"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

export default String;
