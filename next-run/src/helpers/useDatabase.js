//This file contains all the functions to get and modify data from database

import axios from 'axios';

/**
 * Return an object with methods to get and update database. For use in client.
 */
const UseDatabase = () => {

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

  //TODO: Add any new functions defined about to the return obj, or else you can't call it
  return {getAllCourts, getCourt, getAllVisits}
}

export default UseDatabase;