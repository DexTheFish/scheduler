import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // establish state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // GET data
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  // PUT interview data
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = updateSpots({ ...state, appointments });
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({ ...newState, appointments });
      });
  }
  // DELETE interview data
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = updateSpots({ ...state, appointments });
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((response) => {
        setState({ ...newState, appointments });
      });
  }

  function updateSpots(state) {
    // use state to calculate the number of spots remaining
    const currentDayIndex = state.days.findIndex(
      (day) => day.name === state.day
    );
    const currentDay = state.days[currentDayIndex];
    const spots = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    ).length;

    // recreate currentDay with the modified spots
    const updatedDayObj = { ...currentDay, spots };
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;

    // recreate state with the modified day
    const updatedState = { ...state, days: updatedDaysArr };
    return updatedState;
  }
  function setDay(day) {
    setState({ ...state, day });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
