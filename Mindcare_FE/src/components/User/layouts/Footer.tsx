import { images } from "../../../assets/images";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <div>
            <div>
              <img src={images.logo.lo1} />
              <p>MindCare will take care of your mind - Leading your life</p>

              {/*Link to outside web */}

              <nav>
                <Link to="#">
                  <i className="fa-brands fa-twitter" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-facebook" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-instagram" />
                </Link>
                <Link to="#">
                  <i className="fa-brands fa-linkedin" />
                </Link>
              </nav>

            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/coaching">Coaching</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>More</h4>
              <ul>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/sitemap">Sitemap</Link>
                </li>
                <li>
                  <Link to="/code-of-conduct">Code of Conduct</Link>
                </li>
                <li>
                  <Link to="/about-us">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Get in Touch</h4>
              <p>
                <i className="uil uil-envelope-open" /> <span>Email:</span>{" "}
                mindcare@gmail.com
              </p>
              <p>
                <i className="uil uil-store-alt" /> <span>Business Hour:</span>{" "}
                Monday - Friday: 9:00 AM - 6:00 PM (EST), Saturday - Sunday:
                Closed
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
