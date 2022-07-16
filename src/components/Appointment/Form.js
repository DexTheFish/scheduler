import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  // student="Lydia Miller-Jones"
  // interviewer={1}
  // setInterviewer
  // interviewers={interviewers}
  // onSave={action("onSave")}
  // onCancel={action("onCancel")}
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={student}            
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
        interviewers={props.interviewers}
        interviewer={interviewer}
        onChange={(id) => setInterviewer(id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}