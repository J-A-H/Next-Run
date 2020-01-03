import {useState, useEffect} from 'react';

/**
 * Custom hook to get geolocation of browser.
 */
export const usePosition = () => {

  const [position, setPosition] = useState({});
  const [error, setError] = useState({});

  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return {...position, error}
}