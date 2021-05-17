import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import Home from "../Home";
import Discover from "../Discover";
import Profile from "../Profile";

const App: React.FC = () => {
  const { getConfig } = useActions();

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/discover" exact component={Discover} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </div>
  );
};

export default App;
