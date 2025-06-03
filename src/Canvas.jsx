import { useEffect, useState, useRef } from "react";
import canvasImages from "./canvasImages.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import data from "./data.js";

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
            }
        });
        gsap.from(canvasRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power1.inOut",
        });
    });

    useEffect(() => {
        const scale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = canvasImages[index.value];
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
    }, [index]);

    return (
        <>
        <div className="w-full absolute min-h-screen font-[Helvetica] bg-black  text-2xl p-4">
               
            </div>
        <canvas
            data-scroll
            data-scroll-speed={Number(Math.random().toFixed(2))}
            ref={canvasRef}
            className="absolute"
            style={{
                width: `${size * 1.4}px`,
                height: `${size * 1.6}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: zIndex
            }}
            
        >
             </canvas>
        </>
       
    );
}

export default Canvas;
