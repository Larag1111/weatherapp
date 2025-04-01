
import { useState } from "react";
import { useEffect } from "react";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {

  const [city, setCity] = useState('');
  const [favorites, setFavorites] = useState ([]);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
        .then((res) => res.json())
        .then((data) => {
          setCity(data.name);
        });
  },
  
  (error) => {
    console.log("Kunde inte hämta plats:", error);
  }
    );
}

}, []);



const addFavorite = (newCity) => {
  if (!favorites.includes(newCity)) {
    setFavorites([...favorites, newCity]);
  }
}
return (
  <div className="app-container">
    <h1>Laras Väderapp</h1>
    <Search setCity={setCity} />
    <WeatherDisplay city={city} addFavorite={addFavorite} />
    <Favorites favorites={favorites} setCity={setCity} />
  </div>
);

};

export default App;