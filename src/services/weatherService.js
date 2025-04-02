const API_KEY = '86be7f6b8c4ed38ea36d31ba7c7f1ea7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sv`);
  const data = await response.json();
  return data;
};

export const getForecastByCity = async (city) => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=sv`);
  const data = await response.json();
  return data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`);
  const data = await response.json();
  return data;
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`);
  const data = await response.json();
  return data;
};
