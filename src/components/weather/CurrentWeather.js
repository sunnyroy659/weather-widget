import { render } from "@testing-library/react";
import { getDay, getConvertedDate, getRoundOffVal } from "../../utils/dataUtil";

const CurrentWeather = (props) => {
    
    return(
        <div className="row">
          {
            props.weatherList.map((k,v)=>{
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
                         <span style={{fontWeight:'bold', fontSize:'30px'}}>{getRoundOffVal(k.the_temp, props.unit)}</span><span style={(props.unit==='C')?{fontWeight:'bold'}:{}} onClick={()=>props.setUnit("C")}>&#xb0;C</span>|<span style={(props.unit==='F')?{fontWeight:'bold'}:{}} onClick={()=>props.setUnit("F")}>&#xb0;F</span>
                       </div>
                       <div className="col-md-3"></div>
                       <div className="col-md-3">                        
                        Humidity: {k.humidity}%<br/>
                        Wind: {getRoundOffVal(k.wind_speed, "")} kph {k.wind_direction_compass}
                       </div>
                     </div>                      
                  </div>
                )
              }
            })
          }    
      </div>
    )

}
export default CurrentWeather;