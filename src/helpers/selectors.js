
export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.filter(d => d.name === day)[0];
  if (!dayObj) {
    return [];
  }
  const appointmentsForDay = dayObj.appointments.map(id => state.appointments[id]);
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return { ...interview, interviewer: state.interviewers[interview.interviewer]};
}