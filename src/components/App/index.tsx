import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import Home from "../Home";

const App: React.FC = () => {
  const { getConfig } = useActions();

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
