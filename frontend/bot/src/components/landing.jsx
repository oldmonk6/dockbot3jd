import { Navbar } from "./navbar";
import {gsap} from "gsap";
import { useEffect } from "react";

export function Landing(){
    useEffect(() => {
        const string1 = document.querySelector("#string1");
        const string2 = document.querySelector("#string2");
        function breakthetext() {
            const h1 = document.querySelector("#heading1");
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
        const finalpath = `M 10 90 Q 850 90 1500 90`;
    
        const onMouseMove1 = (dets) => {
          path = `M 10 90 Q ${dets.clientX} ${dets.clientY} 1500 90`;
          gsap.to("#animated-path", {
            attr: { d: path },
            duration: 0.5,
            ease: "power3.out",
          });
        };
        const onMouseMove2= (dets) => {
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
    
        if (string1) {
          string1.addEventListener("mousemove", onMouseMove1);
          string1.addEventListener("mouseleave", onMouseLeave1);
         
        }
        if(string2){
            string2.addEventListener("mousemove", onMouseMove2);
            string2.addEventListener("mouseleave", onMouseLeave2);
        }
    
        return () => {
          if (string1) {
            string1.removeEventListener("mousemove", onMouseMove1);
            string1.removeEventListener("mouseleave", onMouseLeave1);
          }
          if(string2){
            string2.removeEventListener("mousemove", onMouseMove2);
            string2.removeEventListener("mouseleave", onMouseLeave2);
          }
        };
      }, []);



      
    return <div className="h-[100vh]">
        <div> <Navbar/></div>
        <div className="w-full h-full flex flex-col gap-9 bg-black"   > <div id="string1"><svg width="500" height="160" xmlns="http://www.w3.org/2000/svg" className="w-[100%]">
        <path id="animated-path" d="M 10 90 Q 850 90 1500 90" stroke="white" fill="transparent"/>
</svg>
</div>
<div className="flex justify-center mt-4">
    <h1 className="text-8xl text-white" id="heading1" >DOCBOT</h1>
</div>
<div className="mt-6" id="string2"><svg width="500" height="160" xmlns="http://www.w3.org/2000/svg" className="w-[100%]">
<path id="animated-path2" d="M 10 90 Q 850 90 1500 90" stroke="white" fill="transparent"/>
</svg>
</div>



</div>
        </div>
}