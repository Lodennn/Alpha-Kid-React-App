import React, { Fragment } from "react";
import Slider from "react-slick";
import classes from "./SlickCarousal.module.scss";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link, useRouteMatch } from "react-router-dom";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      id="slick-arrow-id"
      style={{
        ...style,
        background: "#75d8ff",
        right: "-7rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        transform: "translateY(-100%)",
        width: "5rem",
        height: "5rem",
        borderRadius: "30%",
        color: "#fff",
        cursor: "pointer",
        "&:hover": {
          background: "#000",
        },
      }}
      onClick={onClick}
    >
      <FaArrowAltCircleRight />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{
        ...style,
        background: "#75d8ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        transform: "translateY(-100%)",
        width: "5rem",
        height: "5rem",
        borderRadius: "30%",
        color: "#fff",
        left: "-7rem",
        cursor: "pointer",
        ":hover": {
          background: "#000",
        },
      }}
      onClick={onClick}
    >
      <FaArrowAltCircleLeft />
    </div>
  );
}

const SlickCarousal = (props) => {
  const match = useRouteMatch();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Fragment>
      <div className={classes.slider}>
        <Slider {...settings}>
          {Array.isArray(props.data) &&
            props.data.length > 0 &&
            props.data.map((workshop) => {
              return (
                <Link
                  key={workshop.name}
                  to={`${match.path}/${workshop.id}`}
                  onClick={props.onShowModal}
                >
                  <div className={classes["slider__slide-wrapper"]}>
                    <img
                      src={workshop.image}
                      width="100"
                      height="100"
                      alt="slider-img"
                      className={classes["slider__slide-img"]}
                    />
                    <h3 className={classes["slider__slide-title"]}>
                      {workshop.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
        </Slider>
      </div>
    </Fragment>
  );
};

export default SlickCarousal;
