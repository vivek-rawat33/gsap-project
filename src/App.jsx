import React, { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import String from "./components/String";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setshowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setshowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientX,
            left: e.clientY,
          });
          gsap.to("body", {
            color: "black",
            backgroundColor: "#fd2c2a",
            duration: 2,
          });
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 1.3,
            ease: "power4.inOut",

            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
                duration: 2,
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "white",
            backgroundColor: "black",
            duration: 2,
          });
        }
        return !prevShowCanvas;
      });
    };
    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div data-scroll-container>
        <span
          ref={growingSpan}
          className="growing block fixed top-[-20px] left-0 w-2 h-2 rounded-full
          "
        ></span>
        <div className="w-full relative min-h-screen">
          {showCanvas &&
            data[0].map((canvasdets, idx) => {
              return <Canvas key={idx} details={canvasdets} />;
            })}
          <div className="w-full h-screen" data-scroll data-scroll-speed="0.5">
            <nav className="w-full px-8 top-0 left-0 py-4 flex justify-between items-center">
              <h1 className="font-semibold text-2xl">Thirtysixstudios</h1>
              <ul className="flex gap-8 justify-center items-center">
                {["Home", "About", "Projects", "Contact"].map((link, index) => (
                  <li
                    key={index}
                    className="hover:text-yellow-400 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container px-[20%] w-full">
              <div className="text w-[50%]">
                <h3 className="text-3xl leading-[1.3]">
                  At Thirtysixstudio, we build digital assets and immersive
                  experiences for purposeful brands.
                </h3>
                <p className="text-md w-[80%] mt-7 font-lg relative z-[1]">
                  We're a boutique production studio focused on design,
                  animation, and technology, constantly rethinking what digital
                  craft can do for present-day ads and campaigns.
                </p>
                <p className="mt-7 text-md">Scroll</p>
              </div>
            </div>
            <div className="overflow-x-hidden w-full">
              <div className="w-full text-center absolute bottom-0 left-0">
                <h1
                  ref={headingRef}
                  className="text-[15rem] font-normal tracking-tight leading-none"
                >
                  Thirtysixstudio
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full relative h-screen mt-30 px-10 "
          data-scroll
          data-scroll-speed="0.5"
        >
          {showCanvas &&
            data[1].map((canvasdets, idx) => {
              return <Canvas key={idx} details={canvasdets} />;
            })}
          <h1 className="text-8xl tracking-tighter">About the brand</h1>
          <p className="text-3xl leading-[1.2] w-[70%] mt-8 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            ratione voluptates earum aspernatur nesciunt hic, ipsa tenetur
            dolores, enim iusto sapiente voluptate praesentium laudantium rem!
            Eligendi aperiam error aliquam laborum.
          </p>
          <div
            className="flex gap-8 justify-center items-center relative mt-10 pb-10"
            data-scroll
            data-scroll-speed="0.5"
          >
            {showCanvas &&
              data[3].map((canvasdets, idx) => {
                return <Canvas key={idx} details={canvasdets} />;
              })}
            <img
              className="w-[40%] rounded-3xl"
              src="https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
          </div>
          <footer className="wd-full overflow-x-hidden p-20" data-scroll>
            <String />
            <h1 className="text-2xl font-bold tracking-wide">
              Made by Vivek Singh Rawat
            </h1>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
