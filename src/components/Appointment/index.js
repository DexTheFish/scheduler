import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  // mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  const { mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)

  return (
    <Fragment>
      <Header time={props.time}/>

      {mode === EMPTY && <Empty {...props} onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...props}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={back} onSave={()=>console.log("save me")} interviewers={[]} />
      )}

    </Fragment>
  )

}