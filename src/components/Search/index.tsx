import { RouteComponentProps } from "react-router-dom";
import "./search.scss";

interface Params {
  id: string;
}

const Search: React.FC<RouteComponentProps<Params>> = ({ match }) => {
  return (
    <div className="search-page">
      <h1>Search{match.params.id}</h1>
    </div>
  );
};

export default Search;
