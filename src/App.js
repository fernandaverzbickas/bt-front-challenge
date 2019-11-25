import React, { useState } from "react";
import Geocode from "react-geocode";
import "./App.css";
import AutoComplete from "./components/Autocomplete/Autocomplete";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [userLocation, setUserLocation] = useState("");

  navigator.geolocation.getCurrentPosition(
    position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    },
    function(err) {
      console.log(err);
    }
  );

  if (latitude && longitude) {
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        setUserLocation(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  return (
    <div className="App">
      <AutoComplete userLocation={userLocation} />
    </div>
  );
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export default App;
