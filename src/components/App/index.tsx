import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import Home from "../Home";
import Discover from "../Discover";
import Profile from "../Profile";
import Details from "../Details";
import People from "../People";
import Search from "../Search";

const App: React.FC = () => {
  const { getImagesConfig, getMovieGenreConfig } = useActions();

  useEffect(() => {
    getImagesConfig();
    getMovieGenreConfig();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discover" exact component={Discover} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/details/:type/:id" exact component={Details} />
        <Route path="/people/:id" exact component={People} />
        <Route path="/search/:id" exact component={Search} />
      </Switch>
    </div>
  );
};

export default App;
