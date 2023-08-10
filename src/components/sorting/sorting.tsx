import { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { sorting, sortingValues } from "../../const";
import { selectSorting } from "../../store/reducer/launches-slice";

export function Sorting() {
  const dispatch = useAppDispatch();

  const handleSortingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectSorting(event.target.value))
  }

  return (
    <form className="sorting" action="/#" method="get">
      <select className="sorting__select" onChange={handleSortingChange}>
        {sortingValues.map((value) => <option key={value}>{value}</option>)}
      </select>
    </form>
  )
}
