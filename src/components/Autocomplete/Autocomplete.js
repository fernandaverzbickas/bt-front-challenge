import { GoogleApiWrapper } from "google-maps-react";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import WeatherInfo from "../../containers/WeatherInfo/WeatherInfo";
import "./Autocomplete.css";

function Autocomplete(props) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [locationValid, setLocationValid] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);

  const addToHistory = event => {
    if (event.key === "Enter") {
      setClicked(false);
      let address = event.target.value;
      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let newLocation = [address, lat, lng];

          setSearchHistory([...searchHistory, newLocation]);

          searchHistory.map((each, i) => {
            if (newLocation[1] === each[1] && newLocation[2] === each[2]) {
              setSearchHistory([...searchHistory]);
            }
          });

          if (lat && lng) {
            setLocationValid(true);
          }
        },
        error => {
          console.error(error);
        }
      );
      document.getElementById("inputLocation").value = "";
    }
  };

  useEffect(() => {
    if (props.userLocation) {
      Geocode.fromAddress(props.userLocation).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let re = /\s*-\s*/;
          let formatAddress = props.userLocation.split(re);
          formatAddress = formatAddress[1];
          setSearchHistory([...searchHistory, [formatAddress, lat, lng]]);

          if (lat && lng) {
            setLocationValid(true);
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }, [props.userLocation]);

  const onClick = () => {
    setShowSuggestion(!showSuggestion);
  };

  const onChange = () => {
    setShowSuggestion(true);
  };

  let suggestionsListComponent;
  let eachSearchHistory;

  if (locationValid && clicked === false) {
    for (let index = 0; index < searchHistory.length; index++) {
      let element = searchHistory[index];
      eachSearchHistory = (
        <WeatherInfo
          latitude={element[1]}
          longitude={element[2]}
          location={element[0]}
          key={element[1] + element[2]}
        />
      );
    }
  }

  if (locationValid && clicked === true) {
    for (let index = 0; index < searchHistory.length; index++) {
      if (locationToggle === searchHistory[index][0] && clicked === true) {
        let element = searchHistory[index];
        eachSearchHistory = (
          <WeatherInfo
            latitude={element[1]}
            longitude={element[2]}
            location={element[0]}
            key={element[1] + element[2]}
          />
        );
      }
    }
  }

  const toggleLocation = (id, loc) => {
    setClicked(true);
    setShowSuggestion(!showSuggestion);
    setLocationToggle(loc);
  };

  if (searchHistory) {
    if (searchHistory.length) {
      suggestionsListComponent = (
        <ul className="suggestions" hidden={!showSuggestion} onClick={onClick}>
          {searchHistory.map((suggestion, index) => {
            return (
              <li
                key={suggestion}
                id={index}
                onClick={() => toggleLocation(index, suggestion[0])}
              >
                {suggestion[0]}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions" hidden={!showSuggestion}>
          <em>No suggestions, you're on your own!</em>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="AutocompleteWrapper">
        <input
          id="inputLocation"
          type="text"
          className="Input"
          onKeyDown={addToHistory}
          onClick={onClick}
          onChange={onChange}
          placeholder="Enter location..."
        />
        {suggestionsListComponent}
      </div>
      {eachSearchHistory}
    </div>
  );
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Autocomplete);
