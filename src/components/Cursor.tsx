import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let isHovering = false;
    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };
    let animationFrameId: number;

    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      if (!isHovering) {
        const factor = 0.18;
        cursorPos.x += (mousePos.x - cursorPos.x) * factor;
        cursorPos.y += (mousePos.y - cursorPos.y) * factor;
        setX(cursorPos.x);
        setY(cursorPos.y);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    const cleanupElementListeners: (() => void)[] = [];

    const attachListeners = () => {
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        const element = item as HTMLElement;

        const onMouseOver = (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          const rect = target.getBoundingClientRect();

          if (element.dataset.cursor === "icons") {
            cursor.classList.add("cursor-icons");
            setX(rect.left);
            setY(rect.top);
            cursor.style.setProperty("--cursorH", `${rect.height}px`);
            isHovering = true;
          }
          if (element.dataset.cursor === "disable") {
            cursor.classList.add("cursor-disable");
          }
        };

        const onMouseOut = () => {
          cursor.classList.remove("cursor-disable", "cursor-icons");
          isHovering = false;
        };

        element.addEventListener("mouseover", onMouseOver);
        element.addEventListener("mouseout", onMouseOut);

        cleanupElementListeners.push(() => {
          element.removeEventListener("mouseover", onMouseOver);
          element.removeEventListener("mouseout", onMouseOut);
        });
      });
    };

    attachListeners();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", onMouseMove);
      cleanupElementListeners.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
