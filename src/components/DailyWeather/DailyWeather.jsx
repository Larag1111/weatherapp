import React from 'react';

const DailyWeather = ({ currentWeather }) => {
  return (
    <div>
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
    </div>
  );
};

export default DailyWeather;
