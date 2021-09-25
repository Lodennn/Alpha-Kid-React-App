import { useState, useMemo } from "react";
import Form from "../../../../UI/Form";
import Input from "../../../../UI/Input";
import Modal from "../../../../UI/Modal";
import images from "../../../../../assets";
import useInput from "../../../../../hooks/use-input";
import { generateRandomNumber } from "../../../../../helpers";
import { insertProfileFS } from "../../../../../lib/api";
import useHttp from "../../../../../hooks/use-http";
import { useSelector } from "react-redux";
import { profilesActions } from "../../../../../store/profiles/profiles-slice";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../../../../../store/snackbar/snackbar-slice";

const AddNewProfile = (props) => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);

  const [checkedInput, setCheckedInput] = useState("Male");

  const dispatch = useDispatch();

  const { sendHttpRequest: sendProfileRequest, isLoading } =
    useHttp(insertProfileFS);

  const randomUserProfilePicIndex = useMemo(() => generateRandomNumber(), []);

  const userProfileImagePath = `${
    checkedInput === "Male"
      ? images.profiles[`profileM${randomUserProfilePicIndex}`]
      : images.profiles[`profileF${randomUserProfilePicIndex}`]
  }`;

  const changeCheckedInputHandler = (e) => {
    setCheckedInput(e.target.value);
  };
  const profileUsernameValidate = (value) => {
    return value.length > 5;
  };
  const {
    value: profileUsernameValue,
    onChangeHandler: profileUsernameChangeHandler,
    isValid: profileUsernameIsValid,
    addInValidClasses: profileUsernameInvalidClasses,
    displayErrorMessage: profileUsernameErrorMsg,
  } = useInput(profileUsernameValidate);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (profileUsernameIsValid) {
      // SEND DATA TO FIREBASE
      const profileData = {
        parentId: userId,
        name: profileUsernameValue,
        gender: checkedInput,
        image: userProfileImagePath,
      };
      sendProfileRequest(profileData)
        .then((_) => {
          props.changeActiveUserProfile(profileData);
          dispatch(profilesActions.addProfile(profileData));
          dispatch(profilesActions.setActiveProfile(profileData));
          dispatch(
            snackbarActions.showSnackBar({
              type: "success",
              message: "Profile Added Successfully",
            })
          );
        })
        .catch((err) => console.err(err.message))
        .finally((_) => {
          props.onHide();
        });
    }
  };

  return (
    <Modal onHide={props.onHide}>
      <Form onSubmit={submitFormHandler}>
        <h2 className="form-title">Add new profile</h2>
        <div className="form-control">
          <div className="form-img-preview">
            <img
              src={userProfileImagePath}
              alt="profile img preview"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="form-control">
          <span className="danger">
            {profileUsernameErrorMsg("Username must be more than 6 characters")}
          </span>
          <Input
            input={{
              id: "user-profile-username",
              type: "text",
              name: "user-profile-username",
              onChange: profileUsernameChangeHandler,
              className: profileUsernameInvalidClasses(profileUsernameValue),
            }}
            label="Username"
          />
        </div>
        <div className="form-control">
          <div className="form-input--checkbox">
            <input
              type="radio"
              name="user-profile-gender"
              value="Male"
              checked={checkedInput === "Male"}
              onChange={changeCheckedInputHandler}
            />
            <label>Male</label>
            <input
              type="radio"
              name="user-profile-gender"
              value="Female"
              className="ml-sm"
              checked={checkedInput === "Female"}
              onChange={changeCheckedInputHandler}
            />
            <label>Female</label>
          </div>
        </div>
        <button
          type="submit"
          className="form-submit"
          id="add-new-profile"
          disabled={isLoading}
        >
          {!isLoading && "Add"}
          {isLoading && "Adding"}
        </button>
      </Form>
    </Modal>
  );
};

export default AddNewProfile;
