import { launchesAPI } from "../../services/launches-api";
import { ILaunches } from "../../types/i-launches";
import { getDate } from "../../utils";

interface Props {
  card: ILaunches;
}

export function Card({ card }: Props) {
  const { name, date_local, details, rocket} = card;
  const [dateText, dateTime] = getDate(date_local);

  const { data } = launchesAPI.useGetRocketQuery(rocket);

  return (
    <>
      <h2 className="card__title">{name}</h2>
      <time className="card__date" dateTime={dateTime}>{dateText}</time>
      {data && <img className="card__image" src={data.flickr_images[0]} alt="" />}
      <p className="card__description">{details}</p>
    </>
  )
}

