import { Navbar } from "./navbar";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";

export function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const string1Ref = useRef(null);
  const string2Ref = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // Update the theme in localStorage to retain the mode on refresh
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }

    // Break text into individual spans for animation
    function breakthetext() {
      const h1 = headingRef.current;
      if (h1) {
        const h1text = h1.textContent;
        const splittedtext = h1text.split("");
        let clutter = "";
        splittedtext.forEach(function (elem) {
          clutter += `<span class="inline-block">${elem}</span>`;
        });
        h1.innerHTML = clutter;
      }
    }

    breakthetext();

    gsap.from("#heading1 span", {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.3,
    });

    let path = `M 10 90 Q 850 90 1500 90`;
    const finalpath = "M 10 90 Q 850 90 1500 90";

    const onMouseMove1 = (dets) => {
      path = `M 10 90 Q ${dets.clientX} ${dets.clientY} 1500 90`;
      gsap.to("#animated-path", {
        attr: { d: path },
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const onMouseMove2 = (dets) => {
      path = `M 10 90 Q 850 ${dets.clientY} 1500 90`;
      gsap.to("#animated-path2", {
        attr: { d: path },
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseLeave1 = () => {
      gsap.to("#animated-path", {
        attr: { d: finalpath },
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };
    const onMouseLeave2 = () => {
      gsap.to("#animated-path2", {
        attr: { d: finalpath },
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const string1 = string1Ref.current;
    const string2 = string2Ref.current;

    if (string1) {
      string1.addEventListener("mousemove", onMouseMove1);
      string1.addEventListener("mouseleave", onMouseLeave1);
    }
    if (string2) {
      string2.addEventListener("mousemove", onMouseMove2);
      string2.addEventListener("mouseleave", onMouseLeave2);
    }

    return () => {
      if (string1) {
        string1.removeEventListener("mousemove", onMouseMove1);
        string1.removeEventListener("mouseleave", onMouseLeave1);
      }
      if (string2) {
        string2.removeEventListener("mousemove", onMouseMove2);
        string2.removeEventListener("mouseleave", onMouseLeave2);
      }
    };
  }, [isDarkMode]);

  // Toggle dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-[100vh]">
      <div>
        <Navbar />
      </div>
      <div
        className={`w-full h-full flex flex-col gap-9 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        {/* Light/Dark Mode Toggle Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleTheme}
            className="bg-gray-800 text-white p-2 rounded-md focus:outline-none"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Animated SVG and Heading */}
        <div id="string1" ref={string1Ref}>
          <svg
            width="500"
            height="160"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[100%]"
          >
            <path
              id="animated-path"
              d="M 10 90 Q 850 90 1500 90"
              stroke={isDarkMode ? "white" : "black"}
              fill="transparent"
            />
          </svg>
        </div>

        <div className="flex justify-center mt-4">
          <h1
            className={`text-8xl ${isDarkMode ? "text-white" : "text-black"}`}
            id="heading1"
            ref={headingRef}
          >
            DOCBOT
          </h1>
        </div>

        <div className="mt-6" id="string2" ref={string2Ref}>
          <svg
            width="500"
            height="160"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[100%]"
          >
            <path
              id="animated-path2"
              d="M 10 90 Q 850 90 1500 90"
              stroke={isDarkMode ? "white" : "black"}
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}