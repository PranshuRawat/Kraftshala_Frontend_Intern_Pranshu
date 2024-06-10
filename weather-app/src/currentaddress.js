import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function GetCurrentAddress() {
  const [add, setAdd] = useState("");
  const [temp,setemp] =useState("");
  // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAdd(data.address));
      //fetching temperature from geolocation from openweatherAPI
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
      function showtemp(response) {
        setemp(response.data);
      }
      axios.get(apiUrl).then(showtemp);
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const temp = data.main.temp;
          console.log(`The temperature is ${temp-273.5}°C.`);
        })
        .catch((error) => console.log(error));
    });
  }, []);
  console.log(add, "sfsfh");
  //function created for fetching current date ,time
  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentDate = new Date();
    const date = ` ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    } ${currentDate.getFullYear()} `;
    return date;
  };

  return (
    <>
      <div className="current">
        <h4 style={{ color: "black" }}>Your Current location Details</h4>
        <span style={{ color: "white" }}>
          {" "}
        {add.city},{add.country}
        </span>
        <p style={{ color: "white" }}>{toDateFunction()}</p>
        <p style={{ color: "white" }}>{Math.round(temp?.main?.temp-273.15)}°C</p>
      </div>
    </>
  );
}

export default GetCurrentAddress;
