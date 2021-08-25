import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { getDay, getConvertedDate, getRoundOffVal } from './utils/dataUtil';
import Location from './components/location/Location';
import CurrentWeather from './components/weather/CurrentWeather';
import WeatherForecast from './components/weather-forecast/WeatherForecast';

const App = (props)=> {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  const [unit, setUnit] = useState("C");
  
  const getCurrentLocation = (lat, long) => {
    axios.create({
      headers : {'Accept':'application/json', 'Access-Control-Allow-Origin':'*'}
    })
    .get('https://www.metaweather.com/api/location/search/?lattlong='+lat+','+long+'')
    .then((response)=>{
      let cities = response.data;
      setCityList([...cities]);
      document.querySelector('select#loc').dispatchEvent(new Event('change', {'bubbles':true}));
    })
    .catch((err)=>console.log(err));
  }
  function initGeoLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, fail);
    }
    else{
      console.log("Location could not be detected")
    }
  }
  function success(position){
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    getCurrentLocation(position.coords.latitude, position.coords.longitude)
  }
  function fail(){
    console.log("Browser does not support location");
  }
  const getWeatherReportByLocation = (woeid) => {
    axios.create({
      headers : {'Accept':'application/json', 'Access-Control-Allow-Origin':'*'}
    })
    .get('https://www.metaweather.com/api/location/'+woeid+'')
    .then((response)=>{
      console.log(response.data);
      let weathers = response.data.consolidated_weather;
      setWeatherList([...weathers]);
    })
    .catch((err)=>console.log(err));
  }
  useEffect(()=>{
    initGeoLocation();
  },[])
  return (
    <div className="App container">      
      <Location cityList={cityList} getWeatherReportByLocation={getWeatherReportByLocation}></Location>
      <CurrentWeather weatherList={weatherList} setUnit={setUnit} unit={unit}></CurrentWeather>      
      <WeatherForecast weatherList={weatherList} unit={unit}></WeatherForecast>
    </div>
  );
}

export default App;
