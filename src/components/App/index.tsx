import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Home from "../Home";
import Discover from "../Discover";
import Profile from "../Profile";
import Details from "../Details";
import People from "../People";
import Search from "../Search";
import Login from "../Login";

const App: React.FC = () => {
  const { requestToken, loggedIn } = useTypedSelector(state => state.auth);
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
        <Route path="/details/:type/:id" exact component={Details} />
        <Route path="/people/:id" exact component={People} />
        <Route path="/search/:id" exact component={Search} />
        {loggedIn || requestToken.request_token.length > 0 ? (
          <Redirect from="/login" to="/profile" />
        ) : (
          <Redirect from="/profile" to="/login" />
        )}
        <Route path="/profile" exact component={Profile} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  );
};

export default App;
