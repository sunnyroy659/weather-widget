const Location = (props) => {

return (
   
  <div className="row">
  <div className="col-md-6 text-left" style={{fontSize:'40px',fontWeight:'bold'}}>
  <select className="loc" id="loc" onChange={(e)=>props.getWeatherReportByLocation(e.target.value)}>
    {
      (props.cityList).map((k,v)=>{
        return (
          <option key={v} value={k.woeid}>{k.title}</option>
        )
      })
    }
  </select>
  </div>
  <div className="col-md-6"></div>
</div>
)

}
export default Location;