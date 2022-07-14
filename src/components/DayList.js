import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, value, onChange } = props;

  const DayListItemArray = days.map((dayObj) => {
    return (
      <DayListItem
        key={dayObj.id}
        {...dayObj}
        setDay={onChange}
        selected={dayObj.name === value}
      />
    );
  });

  return (
    <ul>
      {DayListItemArray}
    </ul>
  )
}