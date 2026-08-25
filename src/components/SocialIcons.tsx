import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <span>
          <a
            href="https://github.com/hj8789430972-cloud"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            aria-label="Harsh's GitHub"
            data-cursor="disable"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/harshjaiswal1909"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            aria-label="Harsh's LinkedIn"
            data-cursor="disable"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="mailto:jaiswalharsh193@gmail.com"
            title="Email Harsh"
            aria-label="Send Email"
            data-cursor="disable"
          >
            <FaEnvelope />
          </a>
        </span>
        <span>
          <a
            href="tel:+919431001361"
            title="Call Harsh"
            aria-label="Call Phone"
            data-cursor="disable"
          >
            <FaPhone />
          </a>
        </span>
      </div>
      <a className="resume-button" href="#contact" data-cursor="disable">
        <HoverLinks text="CONTACT" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
