import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = (props)=> {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  const [unit, setUnit] = useState("C");
  const getDay = (date) => {
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date(date).getDay();
    return dayList[day];
  }
  const getConvertedDate = (date) => {
    let dateP = new Date(date).toDateString();
    return dateP.split(" ")[1]+" "+dateP.split(" ")[2];
  }
  const getRoundOffVal = (data) => {
    if(unit==='C'){
      return Math.round(data);
    }
    else{
      data = (9*(parseFloat(data)/5)+32);
      return Math.round(data);
    }
  }
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

    }
  }
  function success(position){
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    getCurrentLocation(position.coords.latitude, position.coords.longitude)
  }
  function fail(){

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
      <div className="row">
        <div className="col-md-6 text-left" style={{fontSize:'40px',fontWeight:'bold'}}>
          <select id="loc" onChange={(e)=>getWeatherReportByLocation(e.target.value)}>
            {
              (cityList).map((k,v)=>{
                return (
                  <option key={v} value={k.woeid}>{k.title}</option>
                )
              })
            }
          </select>
        </div>
        <div className="col-md-6"></div>
      </div>
      <div className="row">
          {
            weatherList.map((k,v)=>{
              if(v==0){
                return (
                  <div key={v} className="col-md-12 text-left">
                     <div className="row">
                       <div className="col-md-8">
                         {getDay(k.applicable_date)}, {getConvertedDate(k.applicable_date)}
                       </div>
                     </div> 
                     <div className="row">
                       <div className="col-md-1">
                         <img style={{height:'50px', width:'50px'}} src={'https://www.metaweather.com/static/img/weather/'+k.weather_state_abbr+'.svg'}/>
                       </div>
                       <div className="col-md-3">
                         <span style={{fontWeight:'bold', fontSize:'30px'}}>{getRoundOffVal(k.the_temp)}</span><span style={(unit==='C')?{fontWeight:'bold'}:{}} onClick={()=>setUnit("C")}>&#xb0;C</span>|<span style={(unit==='F')?{fontWeight:'bold'}:{}} onClick={()=>setUnit("F")}>&#xb0;F</span>
                       </div>
                       <div className="col-md-3">
                         
                       </div>
                       <div className="col-md-3">
                        {/* <p>Humidity: {k.humidity}%</p>
                        <p>Wind: {getRoundOffVal(k.wind_speed)} kph {k.wind_direction_compass}</p>                                         */}
                        Humidity: {k.humidity}%<br/>
                        Wind: {getRoundOffVal(k.wind_speed)} kph {k.wind_direction_compass}
                       </div>
                     </div>                      
                  </div>
                )
              }
            })
          }    
      </div>
      <div className="mb-6 row">
          {
            weatherList.map((k,v)=>{
              return (
                <div key={v} className="col-md-2">
                   <p>{(v==0)?'Today':getDay(k.applicable_date)}</p>
                   <p><img style={{height:'50px', width:'50px'}} src={'https://www.metaweather.com/static/img/weather/'+k.weather_state_abbr+'.svg'}/></p> 
                   <p>{getRoundOffVal(k.the_temp)}&#xb0;</p>
                </div>
              )
            })
          }
      </div>
    </div>
  );
}

export default App;
