import Logo from "../../UI/Logo";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container container-grid-3x">
        <Logo value="20" />
        <ul className={`${classes["footer__list"]} list-unstyled`}>
          <h3 className={`${classes["footer__caption"]}`}>Sitemap</h3>
          <li className={`${classes["footer__item"]}`}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              Home
            </a>
          </li>
          <li className={`${classes["footer__item"]}`}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              Workshops
            </a>
          </li>
          <li className={`${classes["footer__item"]}`}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              Games
            </a>
          </li>
          <li className={`${classes["footer__item"]}`}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              Videos
            </a>
          </li>
          <li className={`${classes["footer__item"]}`}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              Login
            </a>
          </li>
        </ul>
        <ul className="list-unstyled">
          <h3 className={`${classes["footer__caption"]}`}>Contact Us</h3>
          <li className={classes["footer__item"]}>
            <a href="/" className={`${classes["footer__link"]} btn`}>
              exampleemail.gmail.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
