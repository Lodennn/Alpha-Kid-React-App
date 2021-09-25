import { Fragment, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import images from "../../../../assets";
import AddNewProfile from "./AddNewProfile/AddNewProfile";
import classes from "./Profiles.module.scss";
import useHttp from "../../../../hooks/use-http";
import { fetchAllProfilesFS } from "../../../../lib/api";
import { profilesActions } from "../../../../store/profiles/profiles-slice";
import LoadingSpinner from "../../../UI/LoadingSpinner";

const Profiles = () => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);

  console.log("Profiles: ", userId);

  const { profiles, activeUserProfile } = useSelector((state) => state.profile);

  const [activeProfile, setActiveProfile] = useState("");

  const changeActiveProfile = (profile) => {
    dispatch(profilesActions.setActiveProfile(profile));
    setActiveProfile(profile.name);
  };

  const { sendHttpRequest: fetchProfilesRequest, isLoading } =
    useHttp(fetchAllProfilesFS);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfilesRequest(userId).then((profiles) => {
      console.log("profiles FETCHED: ", profiles);
      if (profiles.length === 0) return;
      dispatch(profilesActions.getAllProfiles(profiles));
      setActiveProfile(activeUserProfile.name);
    });
  }, [userId, setActiveProfile, dispatch, fetchProfilesRequest]);

  const [showAddNewProfile, setShowAddNewProfile] = useState(false);

  const showNewProfileHandler = () => {
    setShowAddNewProfile(true);
  };
  const hideNewProfileHandler = () => {
    setShowAddNewProfile(false);
  };
  return (
    <Fragment>
      {showAddNewProfile && (
        <AddNewProfile
          onHide={hideNewProfileHandler}
          changeActiveUserProfile={changeActiveProfile}
        />
      )}
      <div className={`${classes.profiles} mb-md`}>
        <ul className={`${classes["profiles__list"]} list-unstyled`}>
          {!isLoading &&
            activeProfile &&
            profiles.length > 0 &&
            profiles.map((profile, index) => {
              return (
                <li
                  key={index}
                  className={classes["profiles__item"]}
                  onClick={changeActiveProfile.bind(null, profile)}
                >
                  <div className={classes["profiles__image"]}>
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className={`${classes["profiles__img"]} ${
                        activeProfile === profile.name
                          ? classes["profiles__img--active"]
                          : null
                      } img-fluid img-rounded`}
                    />
                  </div>
                </li>
              );
            })}
          {isLoading && <LoadingSpinner />}
          <li
            className={`${classes["profiles__item"]} ${classes["profiles__item--add-new-profile"]}`}
            onClick={showNewProfileHandler}
          >
            <div className={classes["profiles__image"]}>
              <img
                src={images.profiles.default}
                alt="add new profile"
                className={`${classes["profiles__img"]} img-fluid img-rounded`}
              />
            </div>
            <span className={classes["profiles__icon"]}>
              <FaPlus />
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Profiles;
