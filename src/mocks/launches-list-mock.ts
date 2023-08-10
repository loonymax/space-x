import { ILaunches } from "../types/i-launches";
import { datatype } from "faker";

export const makeFakeLaunch = (): ILaunches => ({
  fairings: null,
  links: {
    patch: {
      small: datatype.string(),
      large:  datatype.string(),
    },
    reddit: {
      campaign:  datatype.string(),
      launch:  datatype.string(),
      media:  datatype.string(),
      recovery: null,
    },
    flickr: {
      small: new Array(datatype.number(5)).map(() => datatype.string()),
      original: new Array(datatype.number(5)).map(() => datatype.string()),
    },
    presskit: datatype.string(),
    webcast: datatype.string(),
    youtube_id: datatype.string(),
    article: datatype.string(),
    wikipedia: datatype.string(),
  },
  static_fire_date_utc: datatype.string(),
  static_fire_date_unix: datatype.number(),
  tdb: datatype.boolean(),
  net: datatype.boolean(),
  window: datatype.number(),
  rocket: datatype.string(),
  success: datatype.boolean(),
  failures: new Array(datatype.number(5)).map(() => datatype.string()),
  details: datatype.string(),
  crew: new Array(datatype.number(5)).map(() => datatype.string()),
  ships: new Array(datatype.number(5)).map(() => datatype.string()),
  capsules: new Array(datatype.number(5)).map(() => datatype.string()),
  payloads: new Array(datatype.number(5)).map(() => datatype.string()),
  launchpad: datatype.string(),
  auto_update: datatype.boolean(),
  flight_number: datatype.number(),
  name: datatype.string(),
  date_utc: datatype.datetime({ min: 1218276222, max: 1691579022 }),
  date_unix: datatype.number({ min: 1218276222, max: 1691579022 }),
  date_local: datatype.datetime({ min: 1218276222, max: 1691579022 }).toString(),
  date_precision: datatype.string(),
  upcoming: datatype.boolean(),
  cores: [
    {
      core: datatype.string(),
      flight: datatype.number(),
      gridfins: datatype.boolean(),
      legs: datatype.boolean(),
      reused: datatype.boolean(),
      landing_attempt: datatype.boolean(),
      landing_success: datatype.boolean(),
      landing_type: datatype.string(),
      landpad: datatype.string(),
    }
  ],
  id: datatype.string(),
});

export const makeFakeLaunches = (length = 100) => {
  const offers = Array.from({ length: length }, () => makeFakeLaunch());
  return offers;
};
