const Forecast = ({ forecast }) => {
    return (
      <div>
        <h3 className="weather-title">5-dagarsprognos</h3>
  
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
  
  export default Forecast;
  