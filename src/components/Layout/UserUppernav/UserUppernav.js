import classes from "./UserUppernav.module.scss";

const UserUppernav = () => {
  return (
    <div className={classes["user-uppernav"]}>
      <div
        className={`${classes["user-uppernav__style"]} ${classes["user-uppernav__style--1"]}`}
      ></div>
    </div>
  );
};

export default UserUppernav;
