
import { useState, useEffect } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({city, addFavorite}) => {
    const [weatherData, setWeatherData] = useState(null); 


    //Nedanför skapas en tom lista som senare ska spara vår 5-dagarsprognos
    const [forecast, setForecast] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        if (city) {

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
  .then(response => response.json())
  .then(data => {
    console.log("Dagens väderdata:", data);
    setCurrentWeather(data);
  })
  .catch(error => {
    console.log("Fel vid hämtning av dagens väder:", error);
  });

  
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
            .then(response => response.json())
            .then(data => {
              const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
              console.log('Data från API (5-dagarsprognos):', dailyForecast);
              setForecast(dailyForecast);
            })
            .catch(error => {
              console.log('Något gick fel:', error);
            });
        }
      }, [city]);
         // UseEffect körs om city ändras


        const currentDate = new Date(); //skapar datum & tid
        //toLocaledatestring sv-se visar datumet
        const formattedDate = currentDate.toLocaleDateString('sv-SE');
        //Visar klockslaget
        const formattedTime = currentDate.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit'});

        const getWeatherByLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
        
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
                .then(response => response.json())
                .then(data => {
                  console.log("Väder för din plats:", data);
                  setCurrentWeather(data);
                })
                .catch(error => {
                  console.log("Kunde inte hämta väder för platsen:", error);
                });
        
              fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
                .then(response => response.json())
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

          
              <h3 className="weather-title">Dagens väder</h3>
              {currentWeather && currentWeather.main && currentWeather.weather ? (
  <div className="weather-info">
    <p><strong>Plats:</strong> {currentWeather.name}</p>
    <p><strong>Temperatur:</strong> {currentWeather.main.temp} °C</p>
    <p><strong>Väder:</strong> {currentWeather.weather[0].description}</p>
    <img
      src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
      alt="Väderikon"
    />
  </div>
) : (
  <p>Ingen väderdata tillgänglig.</p>
)}



              <h3>5-dagarsprognos</h3>
              {forecast.length > 0 ? (
                <div className="forecast-container">
                  {forecast.map((item, index) => (
                    <div className="forecast-card" key={index}>
                      <p><strong>Datum:</strong> {item.dt_txt.split(" ")[0]}</p>
                      <p><strong>Temp:</strong> {item.main.temp} °C</p>
                      <p><strong>Väder:</strong> {item.weather[0].description}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="Väderikon"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>Ingen väderdata tillgänglig.</p>
              )}
            </div>
          );
          };
          
          export default WeatherDisplay;
          