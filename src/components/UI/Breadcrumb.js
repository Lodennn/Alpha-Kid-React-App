import { Link } from "react-router-dom";
import classes from "./Breadcrumb.module.scss";

const Breadcrumb = () => {
  return (
    <div className={classes.breadcrumb}>
      <div className={`${classes.container} container`}>
        <Link to="/">Home</Link> / Dashboard
      </div>
    </div>
  );
};

export default Breadcrumb;
