import {useState, useEffect} from 'react';
export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onChange = ({coords}) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };
  const onError = (error) => {
    console.log(error.message);
    setError(error.message);
    // setPosition({
    //   lat: 43.644200,
    //   lng: -79.402207
    // })
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {

      console.log("Geolocation not allowed!");
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);

    // const currentLocation = geo.getCurrentPosition(onChange, onError, {enableHighAccuracy: true});

  }, []);
  return {...position, error};
}