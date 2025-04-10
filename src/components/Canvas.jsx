// import { useEffect, useRef, useState } from "react";
// import canvasimg from "./canvasimg";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// function Canvas({ details }) {
//   const { startIndex, numImages, duration, size, top, left, zIndex } = details;
//   const [index, setindex] = useState({ value: startIndex });

//   const canvasRef = useRef(null);

//   useGSAP(() => {
//     gsap.to(index, {
//       value: startIndex + numImages - 1,
//       duration: duration,
//       ease: "linear",
//       repeat: -1,
//       onUpdate: () => {
//         setindex({ value: Math.round(index.value) });
//       },
//     });
//     gsap.from(canvasRef.current, {
//       opacity: 0,
//       duration: 0.8,
//       ease: "power3.inOut",
//       delay: 0.2,
//     });
//   });
//   useEffect(() => {
//     const scale = window.devicePixelRatio;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     img.src = canvasimg[index.value];
//     img.onload = () => {
//       canvas.width = canvas.offsetWidth * scale;
//       canvas.height = canvas.offsetHeight * scale;
//       canvas.style.height = canvas.offsetHeight + "px";
//       canvas.style.width = canvas.offsetWidth + "px";
//       ctx.scale(scale, scale);
//       ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
//       ctx.scale(scale, scale);
//     };
//   }, [index]);

//   return (
//     <canvas
//       data-
//       data-scroll-speed={Math.random().toFixed(1)}
//       ref={canvasRef}
//       className="absolute"
//       style={{
//         width: `${size * 1.4}px`,
//         height: `${size * 1.4}px`,
//         top: `${top}%`,
//         left: `${left}%`,
//         zIndex: `${zIndex}`,
//       }}
//       id="canvas"
//     ></canvas>
//   );
// }

// export default Canvas;

import { useEffect, useRef, useState } from "react";
import canvasimg from "./canvasimg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setindex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  // Animation
  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        setindex({ value: Math.round(index.value) });
      },
    });
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      delay: 0.2,
    });
  });

  // Image rendering
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    const img = new Image();
    img.src = canvasimg[index.value];

    img.onload = () => {
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0); // sets scale
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
  };

  useEffect(() => {
    renderCanvas();
    window.addEventListener("resize", renderCanvas);
    return () => window.removeEventListener("resize", renderCanvas);
  }, [index]);

  return (
    <canvas
      ref={canvasRef}
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      className="absolute"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        zIndex,
        width: `min(${size}vw, 300px)`, // cap the max canvas size
        height: `min(${size}vw, 300px)`,
      }}
    />
  );
}

export default Canvas;
