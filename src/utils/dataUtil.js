export const getDay = (date) => {
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = new Date(date).getDay();
    return dayList[day];
  }
  export const getConvertedDate = (date) => {
    let dateP = new Date(date).toDateString();
    return dateP.split(" ")[1]+" "+dateP.split(" ")[2];
  }
  export const getRoundOffVal = (data, unit) => {
    if(unit==='C'){
      return Math.round(data);
    }
    else if(unit==='F'){
      data = (9*(parseFloat(data)/5)+32);
      return Math.round(data);
    }
    else{
        return Math.round(data);
    }
  }
  