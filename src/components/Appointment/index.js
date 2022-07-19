import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";


export default function Appointment(props) {
  // mode constants
  const EMPTY    = "EMPTY";
  const SHOW     = "SHOW";
  const EDIT     = "EDIT"
  const CREATE   = "CREATE";
  const DELETING = "DELETING";
  const SAVING   = "SAVING";
  const CONFIRM  = "CONFIRM"
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }
  function deleteAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  return (
    <Fragment>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty {...props} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...props}
          student={props.interview.student } 
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EMPTY)} //temporary
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} />
      )}
      {mode === SAVING && (
        <Status message="saving..." />
      )}
      {mode === DELETING && (
        <Status message="deleting..." />
      )}
      {mode === CONFIRM && (
        <Confirm message="are you sure you want to delete that?" onCancel={back} onConfirm={deleteAppointment} />
      )}

    </Fragment>
  )

}