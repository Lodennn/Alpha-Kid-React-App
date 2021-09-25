import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./WorkshopsWrapper.module.scss";
import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { fetchAllWorkshopsFS } from "../../../lib/api";
import { useDispatch } from "react-redux";
import { workshopActions } from "../../../store/workshops/workshop-slice";

const WorkshopsWrapper = () => {
  // prettier-ignore
  const { data: workshops, sendHttpRequest: fetchAllWorkshopsRequest } = useHttp(fetchAllWorkshopsFS);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllWorkshopsRequest().then((data) => {
      dispatch(workshopActions.getAllWorkshops(data));
    });
  }, [dispatch, fetchAllWorkshopsRequest]);

  return (
    <Wrapper className={classes["workshops-wrapper"]}>
      <Wrapper container={`container-grid-2x container`}>
        {workshops.length > 0 &&
          workshops.map((workshop) => {
            return (
              <Card
                key={workshop.id}
                className="card--workshop"
                type="workshop"
                image={workshop.image}
                name={workshop.name}
                to={`/workshops/${workshop.id}`}
              />
            );
          })}
      </Wrapper>
      {/* <button type="button" className="btn btn--default btn--load">
        Load more
      </button> */}
    </Wrapper>
  );
};

export default WorkshopsWrapper;
