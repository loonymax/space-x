import { useEffect } from "react";
import { Card } from "../../components/card/card";
import { Sorting } from "../../components/sorting/sorting";
import { fetchLaunchesAction } from "../../store/reducer/api-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export function Main() {
  const dispatch = useAppDispatch();
  const launches = useAppSelector((state) => state.launchesReducer.launchesList);

  useEffect(() => {
    dispatch(fetchLaunchesAction());
  }, [dispatch]);

  return (
    <section className="main">
      <Sorting />
      <ul className="card-list">
        {launches && launches.map(card => <li className="card card__wrapper" key={card.id}><Card card={card}/></li>)}
      </ul>
    </section>
  )
}
