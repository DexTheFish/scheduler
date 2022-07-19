import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";


export default function Appointment(props) {
  // mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETE = "DELETE";
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  function deleteAppointment() {
    props.cancelInterview(props.id);
    transition(EMPTY);
  }




  return (
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty {...props} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...props}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EMPTY)} //temporary
          onDelete={deleteAppointment}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} />
      )}

    </Fragment>
  )

}