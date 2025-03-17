
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {

  return (
    <div>
<h1>Laras Väderapp</h1>
<Search/>
<WeatherDisplay/>
<Favorites/>

    </div>
  );

};

export default App;