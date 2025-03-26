
import { useState, useEffect } from 'react';

const WeatherDisplay = ({city, addFavorite}) => {
    const [weatherData, setWeatherData] = useState(null); 


    //Nedanför skapas en tom lista som senare ska spara vår 5-dagarsprognos
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        if (city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
            .then(response => response.json())
            .then(data => {
             console.log('Data från API:(just nu)', data);
                setWeatherData(data);
            })
            .catch(error => {
                console.log('Något gick fel med vädret:', error);
            });
    
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=86be7f6b8c4ed38ea36d31ba7c7f1ea7&units=metric&lang=sv`)
        .then(response => response.json())
        .then(data => {
            const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
       console.log('Data frpn API (prognos):', dailyForecast);
       setForecast(dailyForecast);
        }) 
        
        .catch(error =>{
            console.log('Något gick fel med prognosen:', error);
        });

            
            console.log(`Hämtar väder för ${city}`);
        }

        }, 
        
        [city]);    // UseEffect körs om city ändras


        const currentDate = new Date(); //skapar datum & tid
        //toLocaledatestring sv-se visar datumet
        const formattedDate = currentDate.toLocaleDateString('sv-SE');
        //Visar klockslaget
        const formattedTime = currentDate.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit'});



return (
            <div>
              <h2>Väderinformation</h2>
              <button onClick={() => addFavorite(city)}>Lägg till favorit</button>
          
              {weatherData ? (
                <div>
                  <p>Stad: {weatherData.name}</p>
                  <p>Temperatur: {weatherData?.main?.temp ?? 'Ingen data'} °C</p>
                  <p>Väder: {weatherData?.weather?.[0]?.description ?? 'Ingen data'}</p>
                  <p>Datum: {formattedDate}</p>
                  <p>Tid: {formattedTime}</p>
                </div>
              ) : (
                <p>Ingen väderdata tillgänglig.</p>
              )}
          
              {/* Prognos */}
              <h3>5-dagarsprognos</h3>
              <div>
                {forecast.map((item, index) => (
                  <div key={index}>
                    <p>Datum: {item.dt_txt.split(" ")[0]}</p>
                    <p>Temp: {item.main.temp} °C</p>
                    <p>Väder: {item.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="väderikon" />
                  </div>
                ))}
              </div>
            </div>
          );
          
};

export default WeatherDisplay;