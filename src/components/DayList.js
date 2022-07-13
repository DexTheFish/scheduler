import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days, day, setDay } = props;

  const DayListItemArray = days.map((dayObj) => {
    return <DayListItem key={dayObj.id} {...dayObj} setDay={setDay} selected={dayObj.name === day} />
  })

  return (
    <ul>
      {DayListItemArray}
    </ul>
  )
}