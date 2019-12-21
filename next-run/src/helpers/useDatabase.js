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
    return axios.get('/api/get/allcourts');
  };

  /**
   * Database helpers go here-------------------------------------------
   */


  //TODO: Add any new functions defined about to the return obj, or else you can't call it
  return {getAllCourts}
}

export default UseDatabase;