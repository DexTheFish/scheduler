import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {


  return (
    <Fragment>
      <Header time={props.time}/>
      {props.interview ? <Show {...props} student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty {...props}/>}
    </Fragment>
  )

}