import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {

  const value = props.interviewer;
  const onChange = props.onChange;
  const interviewers = Array.isArray(props.interviewers) && props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem 
        key={interviewerObj.id}
        setInterviewer={() => onChange(interviewerObj.id)}
        selected={value === interviewerObj.id}
        {...interviewerObj}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer List</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}