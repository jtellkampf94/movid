import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./details.scss";

interface Params {
  type: string;
  id: string;
}

const Details: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getDetails, getCredits, getTrailers, getReviews } = useActions();
  const details = useTypedSelector(state => state.details.details);
  const credits = useTypedSelector(state => state.details.credits);
  const trailers = useTypedSelector(state => state.details.trailers);
  const reviews = useTypedSelector(state => state.details.reviews);

  useEffect(() => {
    const type = match.params.type;
    const id = match.params.id;
    getDetails(type, id);
    getCredits(type, id);
    getTrailers(type, id);
    getReviews(type, id);
  }, []);

  return (
    <div>
      <h1>{details?.title}</h1>
      <h2>{details?.overview}</h2>
      <h1>{credits?.cast[0].name}</h1>
      <iframe
        title="1"
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${trailers?.results[0].key}`}
      ></iframe>
      <p>{reviews?.results[0].content}</p>
    </div>
  );
};

export default Details;
