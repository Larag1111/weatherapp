import { useState, useEffect } from 'react';
import './WeatherDisplay.css';
import DailyWeather from '../DailyWeather/DailyWeather';
import Forecast from '../Forecast/Forecast';
import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords
} from '../../services/weatherService';

const WeatherDisplay = ({ city, addFavorite }) => {
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (city) {
      getWeatherByCity(city)
        .then(data => {
          console.log("Dagens väderdata:", data);
          setCurrentWeather(data);
        })
        .catch(error => {
          console.log("Fel vid hämtning av dagens väder:", error);
        });

      getForecastByCity(city)
        .then(data => {
          const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
          console.log("Data från API (5-dagarsprognos):", dailyForecast);
          setForecast(dailyForecast);
        })
        .catch(error => {
          console.log("Något gick fel:", error);
        });
    }
  }, [city]);

  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherByCoords(lat, lon)
          .then(data => {
            console.log("Väder för din plats:", data);
            setCurrentWeather(data);
          })
          .catch(error => {
            console.log("Kunde inte hämta väder för platsen:", error);
          });

        getForecastByCoords(lat, lon)
          .then(data => {
            const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
            setForecast(dailyForecast);
          })
          .catch(error => {
            console.log("Fel med 5-dagarsprognos för platsen:", error);
          });
      }, error => {
        console.log("Kunde inte hämta plats:", error);
      });
    } else {
      alert("Geolocation stöds inte i din webbläsare.");
    }
  };

  return (
    <div>
      <h2>Väderinformation</h2>

      <div className="button-wrapper">
        <button onClick={getWeatherByLocation}>Hämta väder för min plats</button>
        <button onClick={() => addFavorite(city)}>Lägg till favorit</button>
      </div>

      <DailyWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </div>
  );
};

export default WeatherDisplay;
