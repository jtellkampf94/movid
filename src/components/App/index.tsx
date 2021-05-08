import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const App: React.FC = () => {
  const { getConfig, getNowPlayingMovies, getUpcomingMovies } = useActions();
  const state = useTypedSelector(state => state);
  console.log(state);
  useEffect(() => {
    getConfig();
    getNowPlayingMovies();
    getUpcomingMovies();
  }, []);
  return (
    <div className="App">
      <h1>App</h1>
    </div>
  );
};

export default App;
