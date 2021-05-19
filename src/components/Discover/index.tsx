import Header from "../Header";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import DiscoverForm from "../DiscoverForm";

import "./discover.scss";

const Discover: React.FC = () => {
  const state = useTypedSelector(state => state.movies.discover);
  console.log(state);

  return (
    <div className="discover">
      <Header />
      <DiscoverForm />
    </div>
  );
};

export default Discover;
