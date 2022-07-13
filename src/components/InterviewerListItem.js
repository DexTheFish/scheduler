// Create a file with our component name
// Create & Export the component function
// Add the base HTML in the return statement of our component
// Create & Import a CSS / SCSS file holding the style of our component
// Write stories for Storybook to render our component in isolation
// Refactor the hardcoded content to use props & state


import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;
  const className = classNames("interviewers__item", { "interviewers__item--selected": selected });

  return (
    <li className={className} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer"
      />
      {selected && name}
    </li>
  )
}