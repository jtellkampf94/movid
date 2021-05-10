import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import Home from "../Home";
import Discover from "../Discover";

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
      </Switch>
    </div>
  );
};

export default App;
