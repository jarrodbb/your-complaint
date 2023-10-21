import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const FooterBottom = () => {
  return (
    <div className="footer-text">
      <p>Made by Brian Trang, Jarrod Blanning and Kalid Nadere
 </p>
      <div className="social-icons">
        <a href="https://github.com/MakeRedundant">
          <FontAwesomeIcon icon={faGithub} size="2x" className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/brian-t-webdeveloper/">
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="icon" />
        </a>
        <a href="https://twitter.com/fireship_dev">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
        </a>
      </div>
    </div>
  );
};

export default FooterBottom;