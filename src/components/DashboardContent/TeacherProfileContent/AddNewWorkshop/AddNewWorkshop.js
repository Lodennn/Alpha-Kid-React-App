import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../../UI/Button";
import Form from "../../../UI/Form";
import Modal from "../../../UI/Modal";
import Input from "../../../UI/Input";
import useInput from "../../../../hooks/use-input";
import useHttp from "../../../../hooks/use-http";
import { insertWorkshopFS } from "../../../../lib/api";
import { useSelector } from "react-redux";
import { snackbarActions } from "../../../../store/snackbar/snackbar-slice";
import { useDispatch } from "react-redux";
import { workshopActions } from "../../../../store/workshops/workshop-slice";

const AddNewWorkshop = (props) => {
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);

  const [currentLesson, setCurrentLesson] = useState(1);

  const [lessons, setLessons] = useState([currentLesson]);

  const newWorkshopForm = useRef(document.getElementById("newWorkshopForm"));

  const dispatch = useDispatch();

  const {
    isLoading,
    data: workshopData,
    error,
    sendHttpRequest: addWorkshopRequest,
  } = useHttp(insertWorkshopFS);

  const workshopNameValidator = (value) => {
    return value.length > 5;
  };
  const {
    value: workshopNameValue,
    onChangeHandler: workshopNameChangeHandler,
    isValid: workshopNameIsValid,
    addInValidClasses: workshopNameClasses,
    displayErrorMessage: workshopNameErrorMsg,
  } = useInput(workshopNameValidator);

  const workshopImageValidator = (value) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(value);
  };
  const {
    value: workshopImageValue,
    onChangeHandler: workshopImageChangeHandler,
    isValid: workshopImageIsValid,
    addInValidClasses: workshopImageClasses,
    displayErrorMessage: workshopImageErrorMsg,
  } = useInput(workshopImageValidator);

  const addNewLessonHandler = () => {
    setCurrentLesson((state) => state + 1);
    setLessons((state) => {
      return state.concat(currentLesson + 1);
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (workshopNameIsValid && workshopImageIsValid) {
      const formData = [...new FormData(newWorkshopForm.current)];

      const lessons = formData
        .filter((data) => data[0].startsWith("lesson"))
        .map((lesson) => ({ lesson: lesson[1], watched: false }));

      const data = Object.fromEntries(formData);

      const workshopInsertedData = {
        teacherId: userId,
        name: data.name,
        image: data.image,
        lessons,
        hasExam: false,
      };

      dispatch(workshopActions.addWorkshop(workshopInsertedData));

      addWorkshopRequest(workshopInsertedData)
        .then((_) => {
          dispatch(
            snackbarActions.showSnackBar({
              type: "success",
              message: "Workshop Added Successfully",
            })
          );
        })
        .catch((err) => console.log(err))
        .finally((_) => props.onHide());
    }
  };

  return (
    <Modal onHide={props.onHide}>
      <Form
        className="form--lessons"
        onSubmit={formSubmitHandler}
        id="newWorkshopForm"
        ref={newWorkshopForm}
      >
        <h2 className="form-title">Add New Workshop</h2>
        <div className="flex-form">
          <div className="flex-form--p1">
            <div className="form-control">
              <span className="danger">
                {workshopNameErrorMsg(
                  "Workshop name must be more than 5 characters"
                )}
              </span>
              <Input
                input={{
                  type: "text",
                  name: "name",
                  id: "name",
                  onChange: workshopNameChangeHandler,
                  className: workshopNameClasses(workshopNameValue),
                }}
                label="Name"
              />
            </div>
            <div className="form-control">
              <span className="danger">
                {workshopImageErrorMsg(
                  "Workshop image must be more than 5 characters and be a URL Format"
                )}
              </span>
              <Input
                input={{
                  type: "text",
                  name: "image",
                  id: "image",
                  onChange: workshopImageChangeHandler,
                  className: workshopImageClasses(workshopImageValue),
                }}
                label="Image URL"
              />
            </div>
          </div>
          <div className="flex-form--p2">
            {/* Lessons */}
            {lessons.map((lesson) => {
              return (
                <div key={lesson} className="form-control">
                  <Input
                    input={{
                      type: "text",
                      name: `lesson${lesson}`,
                      id: `lesson${lesson}`,
                    }}
                    label={`Lesson ${lesson}`}
                  />
                </div>
              );
            })}
            {/* Lessons */}
          </div>
        </div>
        <div className="form-controls">
          <div className="form-extra-info">
            <h4 className="form-sub-title">Lessons: {currentLesson}</h4>
            <Button
              type="button"
              icon={<FaPlus />}
              text="Add New Lesson"
              onClick={addNewLessonHandler}
            />
          </div>
          <button type="submit" className="form-submit" id="add-new-profile">
            Add
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddNewWorkshop;
