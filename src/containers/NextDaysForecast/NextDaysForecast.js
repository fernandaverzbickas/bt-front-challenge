import { faCloud, faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const NextDaysForecast = props => {
  const forecastData = props.data;
  const [forecastWeek, setForecastWeek] = useState([]);

  let model = {
    day: "",
    cloudiness: [],
    humidity: [],
    maxTemperature: [],
    minTemperature: [],
    temperature: []
  };
  let sunday = JSON.parse(JSON.stringify(model));
  let monday = JSON.parse(JSON.stringify(model));
  let tuesday = JSON.parse(JSON.stringify(model));
  let wednesday = JSON.parse(JSON.stringify(model));
  let thursday = JSON.parse(JSON.stringify(model));
  let friday = JSON.parse(JSON.stringify(model));
  let saturday = JSON.parse(JSON.stringify(model));
  const nextDays = () => {
    if (forecastData !== undefined) {
      for (let index = 0; index < forecastData.length; index++) {
        const element = forecastData[index];
        switch (element.weekDay) {
          case 0:
            sunday.day = "Sunday";
            sunday.cloudiness = [...sunday.cloudiness, element.cloudiness];
            sunday.humidity = [...sunday.humidity, element.humidity];
            sunday.maxTemperature = [
              ...sunday.maxTemperature,
              element.maxTemperature
            ];
            sunday.minTemperature = [
              ...sunday.minTemperature,
              element.minTemperature
            ];
            sunday.temperature = [...sunday.temperature, element.temperature];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 1:
            monday.day = "Monday";
            monday.cloudiness = [...monday.cloudiness, element.cloudiness];
            monday.humidity = [...monday.humidity, element.humidity];
            monday.maxTemperature = [
              ...monday.maxTemperature,
              element.maxTemperature
            ];
            monday.minTemperature = [
              ...monday.minTemperature,
              element.minTemperature
            ];
            monday.temperature = [...monday.temperature, element.temperature];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 2:
            tuesday.day = "Tuesday";
            tuesday.cloudiness = [...tuesday.cloudiness, element.cloudiness];
            tuesday.humidity = [...tuesday.humidity, element.humidity];
            tuesday.maxTemperature = [
              ...tuesday.maxTemperature,
              element.maxTemperature
            ];
            tuesday.minTemperature = [
              ...tuesday.minTemperature,
              element.minTemperature
            ];
            tuesday.temperature = [...tuesday.temperature, element.temperature];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 3:
            wednesday.day = "Wednesday";
            wednesday.cloudiness = [
              ...wednesday.cloudiness,
              element.cloudiness
            ];
            wednesday.humidity = [...wednesday.humidity, element.humidity];
            wednesday.maxTemperature = [
              ...wednesday.maxTemperature,
              element.maxTemperature
            ];
            wednesday.minTemperature = [
              ...wednesday.minTemperature,
              element.minTemperature
            ];
            wednesday.temperature = [
              ...wednesday.temperature,
              element.temperature
            ];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 4:
            thursday.day = "Thursday";
            thursday.cloudiness = [...thursday.cloudiness, element.cloudiness];
            thursday.humidity = [...thursday.humidity, element.humidity];
            thursday.maxTemperature = [
              ...thursday.maxTemperature,
              element.maxTemperature
            ];
            thursday.minTemperature = [
              ...thursday.minTemperature,
              element.minTemperature
            ];
            thursday.temperature = [
              ...thursday.temperature,
              element.temperature
            ];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 5:
            friday.day = "Friday";
            friday.cloudiness = [...friday.cloudiness, element.cloudiness];
            friday.humidity = [...friday.humidity, element.humidity];
            friday.maxTemperature = [
              ...friday.maxTemperature,
              element.maxTemperature
            ];
            friday.minTemperature = [
              ...friday.minTemperature,
              element.minTemperature
            ];
            friday.temperature = [...friday.temperature, element.temperature];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;
          case 6:
            saturday.day = "Saturday";
            saturday.cloudiness = [...saturday.cloudiness, element.cloudiness];
            saturday.humidity = [...saturday.humidity, element.humidity];
            saturday.maxTemperature = [
              ...saturday.maxTemperature,
              element.maxTemperature
            ];
            saturday.minTemperature = [
              ...saturday.minTemperature,
              element.minTemperature
            ];
            saturday.temperature = [
              ...saturday.temperature,
              element.temperature
            ];
            setForecastWeek(
              forecastWeek.concat(
                sunday,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
              )
            );
            break;

          default:
            return <p>{element.weekDay}</p>;
        }
      }
    }
  };

  function arrayAverage(arr) {
    let sum = 0;
    for (let i in arr) {
      sum += arr[i];
    }
    let numbersCnt = arr.length;
    return Math.round(sum / numbersCnt);
  }

  useEffect(() => {
    nextDays();
  }, [forecastData]);

  return (
    <div className="Forecasts">
      {forecastWeek.map(day => {
        if (day.day.length > 3) {
          return (
            <div key={day.day} className="Forecast">
              <p>{day.day}</p>
              <p>{arrayAverage(day.temperature)}°C</p>
              <p>min. {Math.min.apply(null, day.minTemperature)}°C</p>
              <p>max. {Math.max.apply(null, day.maxTemperature)}°C</p>
              <p>
                {arrayAverage(day.cloudiness)}%{" "}
                {<FontAwesomeIcon icon={faCloud} />}
              </p>
              <p>
                {arrayAverage(day.humidity)}%{" "}
                {<FontAwesomeIcon icon={faTint} />}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NextDaysForecast;
