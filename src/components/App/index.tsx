import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Home from "../Home";

const App: React.FC = () => {
  const {
    getConfig
  } = useActions();
  const state = useTypedSelector(state => state);
 
  useEffect(() => {
    getConfig()
  }, []);
  return (
    <div className="App">
      <h1>App</h1>
      <Home />
    </div>
  );
};

export default App;
