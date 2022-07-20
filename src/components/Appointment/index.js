import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  // mode constants
  const EMPTY   = "EMPTY";
  const SHOW    = "SHOW";
  const EDIT    = "EDIT"
  const CREATE  = "CREATE";
  const CONFIRM = "CONFIRM"
  const DELETING     = "DELETING";
  const SAVING       = "SAVING";
  const ERROR_SAVE   = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteAppointment() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
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
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} student={props.interview.student} interviewer={props.interview.interviewer ? props.interview.interviewer.id : null}/>
      )}
      {mode === ERROR_SAVE && (
        <Error message="failed to save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="failed to delete appointment" onClose={back} />
      )}
    </Fragment>
  )

}