import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const { days } = props;
  const day = props.day;
  const setDay = props.setDay;

  const DayListItemArray = days.map((dayObj) => {
    return <DayListItem key={dayObj.id} {...dayObj} selected={dayObj.name === day} />
  })

  return (
    <ul>
      {DayListItemArray}
    </ul>
  )
}