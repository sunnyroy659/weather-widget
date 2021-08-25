import { getDay, getConvertedDate, getRoundOffVal } from "../../utils/dataUtil";

const WeatherForecast = (props) => {
    return (
        <div className="mb-6 row">
          {
            props.weatherList.map((k,v)=>{
              return (
                <div key={v} className="col-md-2">
                   <p>{(v==0)?'Today':getDay(k.applicable_date)}</p>
                   <p><img style={{height:'50px', width:'50px'}} src={'https://www.metaweather.com/static/img/weather/'+k.weather_state_abbr+'.svg'}/></p> 
                   <p>{getRoundOffVal(k.the_temp, props.unit)}&#xb0;</p>
                </div>
              )
            })
          }
      </div>
    )
}
export default WeatherForecast;