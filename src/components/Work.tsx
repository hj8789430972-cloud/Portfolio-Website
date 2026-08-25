import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    name: "ESP32 Gas Monitor",
    category: "IoT & Embedded",
    tools: "ESP32, MQ Sensors, Arduino IDE, Proteus, Wi-Fi Web Server",
    image: "/images/esp32_project.jpg",
    link: "https://github.com/hj8789430972-cloud",
  },
  {
    name: "Generative AI & ChatGPT",
    category: "Udemy Certified",
    tools: "GenAI, ChatGPT, Prompt Engineering, LLM Workflows",
    image: "/images/genai_cert.jpg",
    link: "https://drive.google.com/file/d/1WwSMv65y-YD__2OtpUwgvrR9gOlw-5db/view?usp=sharing",
  },
  {
    name: "Computer Networking",
    category: "Coursera | Google",
    tools: "TCP/IP, Routing Protocols, DNS, Network Layers",
    image: "/images/networking_cert.jpg",
    link: "https://drive.google.com/file/d/1vAzqAnK64y1b6vFZnKSQywN_EYda0p2x/view?usp=sharing",
  },
  {
    name: "Software Dev Processes",
    category: "Coursera Certified",
    tools: "Agile, Scrum, SDLC, Testing Methodologies",
    image: "/images/sdlc_cert.jpg",
    link: "https://drive.google.com/file/d/1KQP2RzxxgWK8b5AVZuD7-SVsg0N3Qv-f/view?usp=sharing",
  },
  {
    name: "LeetCode 100 Days Badge",
    category: "Achievement & DSA",
    tools: "200+ Solved Problems, C++, Python, Data Structures",
    image: "/images/leetcode_badge.jpg",
    link: "https://github.com/hj8789430972-cloud",
  },
  {
    name: "Top 10 Hackathon Finalist",
    category: "Innovation & Prototype",
    tools: "Web Prototype, Rapid Development, Problem Solving",
    image: "/images/hackathon.jpg",
    link: "https://github.com/hj8789430972-cloud",
  },
];

const Work = () => {
  useGSAP(() => {
    const calculateDistance = () => {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      if (!workFlex) return 1000;
      const parent = workFlex.parentElement;
      if (!parent) return 1000;
      const distance = workFlex.scrollWidth - parent.clientWidth + 60;
      return Math.max(distance, 100);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calculateDistance()}`,
        scrub: 1,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    timeline.to(".work-flex", {
      x: () => -calculateDistance(),
      ease: "none",
    });

    // Ensure ScrollTrigger recalculates pin spacers accurately
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Projects <span>&</span> Certifications
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Highlights</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
