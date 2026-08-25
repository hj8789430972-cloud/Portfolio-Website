import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { setSmoother, getSmoother } from "./utils/smoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const sm = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.0,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(sm);
    sm.scrollTop(0);
    sm.paused(true);

    const links = document.querySelectorAll(".header ul a");
    const cleanupFns: (() => void)[] = [];

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        const section = element.getAttribute("data-href") || element.getAttribute("href");
        if (!section) return;

        const currentSmoother = getSmoother();
        if (currentSmoother && !currentSmoother.paused() && window.innerWidth > 1024) {
          currentSmoother.scrollTo(section, true, "top top");
        } else {
          const targetEl = document.querySelector(section);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      };

      element.addEventListener("click", handleClick);
      cleanupFns.push(() => element.removeEventListener("click", handleClick));
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupFns.forEach((fn) => fn());
      sm.kill();
      setSmoother(null);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          HARSH
        </a>
        <a
          href="mailto:jaiswalharsh193@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          jaiswalharsh193@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#career" href="#career">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#techstack" href="#techstack">
              <HoverLinks text="TECH STACK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
