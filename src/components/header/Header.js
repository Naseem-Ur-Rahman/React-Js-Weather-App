import React, { useState } from "react";
import "./header.css";
import axios from "axios";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsThermometerSun } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { SiApacheairflow } from "react-icons/si";
import { GiTriforce } from "react-icons/gi";

const Header = () => {
  const [city, setCity] = useState("");
  const [tempData, setTempData] = useState({
    Country: "",
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    wind_speed: 0,
    description: "",
  });

  const handleClick = () => {
    const APP_URL = 'https://api.openweathermap.org/data/2.5/weather?'
    const API_KEY = process.env.REACT_APP_API_KEY
    axios
      .get(
        `${APP_URL}q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        setTempData({
          Country: response.data.name,
          temp: response.data.main.temp - 273.15,
          feels_like: response.data.main.feels_like - 273.15,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          wind_speed: response.data.wind.speed,
          description: response.data.weather[0].description,
        });
        console.log(response.data);
        setCity("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Start of SearchBar */}

      <div className="header__container">
        <div className="header__title">
          <h1>Weather_App</h1>
          <h4>Know the Temperature</h4>
        </div>

        <div className="header__searchbar">
          <input
            placeholder="Eneter the city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button type="submit" onClick={handleClick}>
            {" "}
            Get Temp{" "}
          </button>
        </div>
      </div>
      {/* End of SearchBar */}

      {/* Start of Country Description */}

      <div className="card__container">
        <div className="card__country-data">
          <h3>{"Searched Country: " + tempData.Country}</h3>
          <span>{"Current Temp: " + tempData.temp.toFixed(2)}&deg;C</span>
          <span>{"Description: " + tempData.description}</span>
        </div>
      </div>
      {/* End of Country Description */}

      {/* Start of Small Cards */}
      
      <div className="smcard__container">
          <div className="card__small">
            <div className="card__small-description">
              <AiOutlineArrowDown />
              <small>Min Temp</small>
            </div>
            <h2>{tempData.feels_like.toFixed(2)}&deg;C</h2>
          </div>
          <div className="card__small">
            <div className="card__small-description">
              <BsThermometerSun />
              <small>Feels Like</small>
            </div>
            <h2>{tempData.feels_like.toFixed(2)}&deg;C</h2>
          </div>
          <div className="card__small">
            <div className="card__small-description">
              <WiHumidity />
              <small>Humadity</small>
            </div>
            <h2>{tempData.humidity}</h2>
          </div>
          <div className="card__small">
            <div className="card__small-description">
              <GiTriforce />
              <small>Pressure</small>
            </div>
            <h2>{tempData.pressure}</h2>
          </div>
          <div className="card__small">
            <div className="card__small-description">
              <SiApacheairflow />
              <small>Wind Speed</small>
            </div>
            <h2>{tempData.wind_speed + ""} m/s</h2>
          </div>
        </div>
      </div>
      // End of Small Cards
    
  );
};

export default Header;
