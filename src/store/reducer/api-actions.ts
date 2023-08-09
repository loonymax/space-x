import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ILaunches } from "../../types/i-launches";

export const fetchLaunchesAction = createAsyncThunk<
  ILaunches[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<ILaunches[]>('v5/launches');
  return data;
});
