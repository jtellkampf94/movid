import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Details as DetailsResult } from "../../redux/reducers/details-reducer";

import "./details.scss";

interface Params {
  type: string;
  id: string;
}

const Details: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getDetails } = useActions();
  const details = useTypedSelector(state => state.details.details);

  useEffect(() => {
    getDetails(match.params.type, match.params.id);
  }, []);
  return (
    <div>
      <h1>{details?.title}</h1>
    </div>
  );
};

export default Details;
