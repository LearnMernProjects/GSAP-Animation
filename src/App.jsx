import "./index.css";
import Canvas from "./canvas.jsx";
import data from "./data.js";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect,useState, useRef} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"

function App() {
  const [showCanvas,setShowCanvas]= useState(false); 
  const headingref= useRef(null);
  const growingSpanRef = useRef(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    const handleClick = () => {
  setShowCanvas(prev => !prev);
};
const heading = headingref.current;
if (heading) {
  heading.addEventListener("click", (handleClick));
  
  console.log(handleClick.clientX, handleClick.clientY);
}
return () => {
  if (heading) {
    heading.removeEventListener("click", (handleClick));
      console.log(handleClick.clientX, handleClick.clientY);
  }
};
  }, [showCanvas]);
  useEffect(() => {
    const locomotiveScroll= new LocomotiveScroll();
},[]);
  useGSAP(() => {
    headingref.current.addEventListener("click", (handleclick) => {
      setShowCanvas(!showCanvas);
      gsap.set(growingSpanRef.current, {
        top: handleclick.clientX,
        left: handleclick.clientY
      });
    });
    gsap.to(growingSpanRef.current, {
      scale: 1000,
      duration: 1.3,
      ease: "power2.inout",
      onComplete: () => {
        gsap.set(growingSpanRef.current, {
          scale: 0,
          clearProps: "all",
          display: "none",
        });
      }
    });
  }, [showCanvas]);
  return (
    <>
    <span ref={growingSpanRef} className="growing rounded-full block fixed top-0 left-0 w-5 h-5"></span>
      <div className="w-full relative min-h-screen font[Helvitica_now_display]">
      
        <div className="w-full h-screen bg-black relative text-white">
          <nav className="w-full p-8 flex justify-between z-[1]  text-white ">
            <div id="v" className="brand text-2xl font-regular">Thirty Six Studious</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contacts"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-white hover:text-gray-300 transition-colors duration-300 text-md"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer z-[1] px-[20%] w-full bg-black">
            <div className="text w-[48%] leading-[1.95]">
            <h3 className="text-4xl">
              At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
            </h3>
            <p className="text-md w-[80%] mt-10 font-normal ">We're a boutique production studio focused on design, 
              animation, and technology, constantly rethinking 
              what digital craft can do for present-day ads and campaigns.</p>
              <p className="text-md mt-10 text-2.0xl">Scroll</p>
          </div>
          
      
        </div>
        
        <div className =" w-full">
        <div className="w-full bottom-0 left-10">
          <h1 ref={headingref} className="text-[11.5rem]  font-normal pl-5 ml-20 tracking-[0.05em] text-white leading-none w-[100%] bg-black">
            Thirtysixstudio</h1>
               
               <div className="text-white w-full h-screen mt-8 relative tracking-tighter bg-black  px-2">
                <h1 className="text-6xl">01-WHAT WE DO</h1>
                <p id="mai" className="text-5xl  w-[100%] mt-[5%] relative pl-[50%] font-normal">As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.
             Our commitment to innovation and simplicity, paired with our 
             agile approach, ensures your journey with us is smooth and enjoyable from start to finish.</p>
              <p className="text-2xl  w-[100%] mt-[5%] pl-[50%] relative font-light">
             We aim to elevate digital production in the advertising space, bringing your ideas to life.
             Our commitment to innovation and simplicity, paired 
            with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.                 </p>

      <img id="img1" src="https://img.freepik.com/free-photo/top-view-various-indian-spices-seasonings-table_181624-58725.jpg?semt=ais_hybrid&w=740" height="200px" width="1200px"></img>
                 
              
                 
                 
            
          </div>
          
           </div>
          </div>
          <div>
           
            
          </div>
        
        {/* Other content below */}
         {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
         
      </div>
        </div>
    </>
  );
}
export default App;