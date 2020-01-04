//This file contains all the functions to get and modify data from database

import axios from "axios";

/**
 * Return an object with methods to get and update database. For use in client.
 */
const UseDatabase = () => {

  /**
   * Return all courts in table courts (Example helper)
   */
  const getAllCourts = () => {
    return axios.get("/courts");
  };

  const getCourt = id => {
    return axios.get("/courts/" + id);
  };

  // /**
  //  * Return all visits
  //  */
  // const getAllVisits = () => {
  //   return axios.get('/visits')
  // }

  /**
   * Returns all visits for a court
   * @param {*} court_id
   */
  const getAllVisits = court_id => {
    return axios.get("/visits/" + court_id);
  };

  /**
   * Returns an object of the daily court activity
   * @param {*} court_id
   */
  const getDailyPeakTimes = async court_id => {

    const hours  = {}

    for(let i = 0; i < 24; i++){
      hours[i] = 0;
    }

    const visits = await getAllVisits(court_id);
    
    visits.data.forEach(visit => {
      const time = new Date(visit.times_stamp);
      const hour = time.getHours();
      hours[hour] += 1;
    });

    return hours;
  };

  const getWeeklyPeakTimes = async court_id => {
    const days = {}

    for(let i = 0; i < 7; i++){
      days[i] = 0;
    }

    const visits = await getAllVisits(court_id);

    visits.data.forEach(visit => {
      const time = new Date(visit.times_stamp);
      const day = time.getDay();
      days[day] += 1;
    })

    return days;

  }

  return { getAllCourts, getCourt, getAllVisits, getDailyPeakTimes, getWeeklyPeakTimes };
};

export default UseDatabase;
