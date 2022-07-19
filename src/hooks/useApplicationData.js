import {useState, useEffect} from "react";
import axios from "axios";
// const {
  // state,
  // setDay,
  // bookInterview,
  // cancelInterview
// } = useApplicationData();

export default function useApplicationData() {

  // establish state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {setState({ ...state, day })}

  // GET data
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  // PUT interview data
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then((response) => {
      setState({...state, appointments});
      })
  }
  // DELETE interview data
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) => {
      console.log(response);
      setState({...state, appointments});
    })
  }
  return {state, setDay, bookInterview, cancelInterview};
}

