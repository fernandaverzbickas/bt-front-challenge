import {
  faCloud,
  faMoon,
  faSun,
  faTint
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NextDaysForecast from "../NextDaysForecast/NextDaysForecast";
import "./WeatherInfo.css";

const WeatherInfo = props => {
  const [hasError, setErrors] = useState(false);
  const [cityWeatherInfo, setCityWeatherInfo] = useState({});

  let latitude = props.latitude;
  let longitude = props.longitude;
  let location = props.location;
  let weatherInfo;

  async function fetchData() {
    const res = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&APPID=" +
        process.env.REACT_APP_WEATHER_API_KEY
    );
    await res
      .json()
      .then(res => {
        weatherInfo = res;
        let timezoneCorrection =
          weatherInfo.city.timezone === -10800
            ? 0
            : weatherInfo.city.timezone + 10800;
        let correctDate = new Date().getTime() + timezoneCorrection * 1000;
        setCityWeatherInfo({
          id: weatherInfo.city.id,
          date: new Date(correctDate).toString().slice(0, 21),
          sunset: new Date(
            (weatherInfo.city.sunset + timezoneCorrection) * 1000
          )
            .toString()
            .slice(16, 21),
          sunrise: new Date(
            (weatherInfo.city.sunrise + timezoneCorrection) * 1000
          )
            .toString()
            .slice(16, 21),
          forecasts: weatherInfo.list.map(forecast => {
            let dateSeconds =
              new Date(forecast.dt_txt).getTime() + timezoneCorrection * 1000;

            let hour = Number(new Date(dateSeconds).toString().slice(16, 18));
            return {
              weekDay: new Date(dateSeconds).getDay(),
              hour: hour,
              cloudiness: forecast.clouds.all,
              humidity: forecast.main.humidity,
              temperature: Math.round(forecast.main.temp - 273.15),
              minTemperature: Math.round(forecast.main.temp_min - 273.15),
              maxTemperature: Math.round(forecast.main.temp_max - 273.15),
              weather: forecast.weather
            };
          })
        });
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="CityContainer">
      {cityWeatherInfo !== {} && cityWeatherInfo.forecasts !== undefined ? (
        <div key={cityWeatherInfo.id}>
          <h1 className="Title">{location.toUpperCase()}</h1>
          <p>{cityWeatherInfo.date}</p>
          <p>
            <FontAwesomeIcon icon={faSun} /> {cityWeatherInfo.sunrise}
          </p>
          <p>
            <FontAwesomeIcon icon={faMoon} /> {cityWeatherInfo.sunset}
          </p>
          <h1>HOURLY FORECAST</h1>
          <div className="Forecasts">
            {cityWeatherInfo.forecasts.slice(0, 6).map((info, i) => (
              <div key={i} className="Forecast">
                <p>{info.hour}h</p>
                <p>{info.temperature}°C</p>

                {info.weather.map(desc => (
                  <p key={new Date()}>
                    {desc.description.charAt(0).toUpperCase() +
                      desc.description.slice(1)}
                  </p>
                ))}

                <p>min. {info.minTemperature}°C</p>
                <p>máx. {info.maxTemperature}°C</p>
                <p>
                  {info.cloudiness}% {<FontAwesomeIcon icon={faCloud} />}
                </p>

                <p>
                  {info.humidity}% {<FontAwesomeIcon icon={faTint} />}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>{hasError ? <p>hasError</p> : <p>Loading...</p>}</div>
      )}
      <h1>WEEKLY FORECAST</h1>
      <NextDaysForecast
        data={cityWeatherInfo.forecasts}
        key={cityWeatherInfo.id + "next"}
      />
    </div>
  );
};
export default WeatherInfo;
