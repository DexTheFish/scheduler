import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

// Refactor the hardcoded content to use props & state

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer} = props;
  const InterviewerListItemArray = interviewers.map((interviewerObj) => {
    return <InterviewerListItem 
    key={interviewerObj.id}
    setInterviewer={setInterviewer}
    selected={interviewer === interviewerObj.id}
    {...interviewerObj}  />
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer List</h4>
      <ul className="interviewers__list">{InterviewerListItemArray}</ul>
    </section>
  )


}