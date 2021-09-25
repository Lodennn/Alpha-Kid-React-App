import classes from "./CharactersBar.module.scss";
import images from "../../../assets/";

const CharactersBar = () => {
  return (
    <div className={`${classes.characters} flex-center`}>
      <ul
        className={`${classes["characters__list"]} list-unstyled flex-center `}
      >
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img1}
            alt="character 1"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img2}
            alt="character 2"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img3}
            alt="character 3"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img4}
            alt="character 4"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img5}
            alt="character 5"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img6}
            alt="character 6"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
        <li className={classes["characters__item"]}>
          <img
            src={images.characters.img7}
            alt="character 7"
            className={`${classes["characters__img"]} img-fluid`}
          />
        </li>
      </ul>
    </div>
  );
};

export default CharactersBar;
