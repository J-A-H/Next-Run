//This file contains all the functions to get and modify data from database

import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * Return an object with methods to get and update database. For use in client.
 */
const UseDatabase = () => {

  const [allCourts, setAllcourts] = useState([]);

  /**
   * Return all courts in table courts (Example helper)
   */
   const getAllCourts = () => {
    return axios.get('/courts');
  };


  const getCourt = (id) => {
    return axios.get('/courts/' + id);
  };

  /**
   * Return all visits
   */
  const getAllVisits = () => {
    return axios.get('/visits')
  }

  useEffect(() => {
    const initializeState = async () => {
      const allCourtsQuery = await getAllCourts();

      setAllcourts(
        allCourtsQuery.data);
    };

    initializeState();
  }, []);
  
  return {allCourts, getCourt, getAllVisits}
}

export default UseDatabase;