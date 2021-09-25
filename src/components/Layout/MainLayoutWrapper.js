import { useSelector } from "react-redux";
import AccountUppernav from "./AccountUppernav/AccountUppernav";
import Footer from "./Footer/Footer";
import MainNavigation from "./MainNavigation/MainNavigation";
import Uppernav from "./Uppernav/Uppernav";

const MainLayoutWrapper = (props) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <>
      {!isLoggedIn && <Uppernav />}
      {isLoggedIn && <AccountUppernav />}
      <MainNavigation />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayoutWrapper;
