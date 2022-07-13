import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const dayClass = classNames("day-list__item", {
     "day-list__item--full" : spots === 0,
     "day-list__item--selected" : selected
    });

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}