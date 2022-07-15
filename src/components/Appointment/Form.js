import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  // student="Lydia Miller-Jones"
  // interviewer={1}
  // setInterviewer
  // interviewers={interviewers}
  // onSave={action("onSave")}
  // onCancel={action("onCancel")}


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.student || "Enter Student Name"}
            value={props.student || ""}
            
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList
        interviewers={props.interviewers}
        interviewer={props.interviewer}
        setInterviewer={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}