import { Link } from "react-router-dom";
import images from "../../assets";

const Logo = (props) => {
  return (
    <div className="logo" style={{ width: `${props.value}rem` }}>
      <Link to="/">
        <img src={images.Logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
