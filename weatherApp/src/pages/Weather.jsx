import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { CardContent } from "@mui/material";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem("favourites")) || []
  );

  const fetchWeatherData = async (selectedCity) => {
    const cityName = selectedCity || city;
    if (!cityName) return;
    setLoading(true);
    setError("");
    try {

     const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeather(currentWeatherResponse.data);
      console.log(currentWeatherResponse);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setForecast(
        forecastResponse.data.list.filter((_, index) => index % 8 === 0)
      );
        console.log(forecastResponse);

      setCity(cityName);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addFavourite = () => {
    if (city && !favourites.includes(city)) {
      const updatedFavourites = [...favourites, city];
      setFavourites(updatedFavourites);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    }
  }

  useEffect(() => {
    if (city) fetchWeatherData(city);
  }, []); // Fetch default data on load if needed

  return (
    <div>
      <h1>Weather Tracker</h1>
      <Stack direction="row" spacing={2} >
        <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)}/>
        <Button variant="contained" onClick={() => fetchWeatherData(city)}>Search</Button>
        <Button variant="contained" onClick={addFavourite}>Add to Favourites</Button>
      </Stack>
      {favourites.length > 0 && (
        <div>
          <h2>Favourites</h2>
          <ul>
            {favourites.map((favCity, i) => (
              <li key={i}>
                <Button variant="contained" onClick={() => fetchWeatherData(favCity)}>{favCity}</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h2>Current Weather in {weather.name}</h2>
          <p>
            Temperature:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              {" "}
              {weather.main.temp}
            </span>
            °C
          </p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
      {forecast.length > 0 && (
        <div>
          <h2>5-Day Forecast</h2>
          {forecast.map((day, index) => (
            <div key={index}>
              <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>
                Temp:<b>{day.main.temp}</b> °C
              </p>
              <p>Condition: {day.weather[0].description}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


