import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./WorkshopsWrapper.module.scss";
import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { fetchDataFS } from "../../../lib/api";
import { useDispatch } from "react-redux";
import { workshopActions } from "../../../store/workshops/workshop-slice";
import LoadingSpinner from "../../UI/LoadingSpinner";

const WorkshopsWrapper = () => {
  // prettier-ignore
  const { data: workshops, sendHttpRequest: fetchAllWorkshopsRequest, isLoading } = useHttp(fetchDataFS);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllWorkshopsRequest({ collection: "workshops" }).then((data) => {
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
        {isLoading && <LoadingSpinner />}
        {workshops.length === 0 && <h2>No Workshops Yet 😶</h2>}
      </Wrapper>
    </Wrapper>
  );
};

export default WorkshopsWrapper;
