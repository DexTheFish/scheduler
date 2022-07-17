import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = (day) => setState({ ...state, day });
//  const setDays = (days) => setState(prev => ({ ...prev, days }));
  const dailyAppointments = [];


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      console.log(all[1]);
    })
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
    days={state.days}
    value={state.day}
    onChange={setDay}
  />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {Object.values(dailyAppointments).map(appointment => {
          return <Appointment key={appointment.id} {...appointment}/>
        })}
        <Appointment key="last" time="5pm" id={100} />
      </section>
    </main>
  );
}
