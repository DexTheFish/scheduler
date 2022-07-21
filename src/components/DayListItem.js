import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--full": spots === 0,
    "day-list__item--selected": selected,
  });

  function formatSpots(spots) {
    if (spots > 1) {
      return `${spots} spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    if (spots === 0) {
      return `no spots remaining`;
    }
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
