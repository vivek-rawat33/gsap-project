import { useEffect, useRef, useState } from "react";
import canvasimg from "./canvasimg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setindex] = useState({ value: startIndex });

  const canvasRef = useRef(null);

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
  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasimg[index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.height = canvas.offsetHeight + "px";
      canvas.style.width = canvas.offsetWidth + "px";
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.scale(scale, scale);
    };
  }, [index]);

  return (
    <canvas
      data-
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.4}px`,
        height: `${size * 1.4}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
