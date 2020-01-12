const helpers = () => {

  /**
   * Returns kebab case version of string
   * @param {*} string 
   */
  const toKebabCase = (string) => {
    return string.split(" ").join("-");
  }

  const randomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  const getTimeStamp = (time) => {

    let result = "";

    //Get hours;

    const date = new Date (time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const currentDate = new Date(Date.now());

    const diff = currentDate.getHours() - hours;

    if(diff > 23){
      result += `${date.toDateString()} `;
    }
    
    if(hours > 12){
      result += `${hours - 12}:`;
    }
    else{
      result += `${hours}`;
    }

    result += `${minutes} `;

    if(hours >= 12){
      result += ("PM")
    }
    else{
      result+= "AM";
    }

    return result;
  }

  return {toKebabCase, randomId, getTimeStamp}
}

export default helpers;
