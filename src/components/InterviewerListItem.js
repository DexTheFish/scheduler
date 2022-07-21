// Create a file with our component name
// Create & Export the component function
// Add the base HTML in the return statement of our component
// Create & Import a CSS / SCSS file holding the style of our component
// Write stories for Storybook to render our component in isolation
// Refactor the hardcoded content to use props & state

import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
