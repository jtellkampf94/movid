import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Params {
  id: string;
}

const People: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  const { getPeopleDetails, getPeopleCombinedCredits } = useActions();

  useEffect(() => {
    const id = match.params.id;
    getPeopleDetails(id);
    getPeopleCombinedCredits(id);
  }, []);

  const person = useTypedSelector(state => state.people);

  return (
    <div>
      <h1>People</h1>
    </div>
  );
};

export default People;
