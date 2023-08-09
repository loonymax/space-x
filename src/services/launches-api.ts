import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../const';
import { ILaunches } from '../types/i-launches';
import { IRocket } from '../types/i-rocket';

export const launchesAPI = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getLaunches: build.query<ILaunches[], void>({
      query: () => 'v5/launches',
    }),
    getRocket: build.query<IRocket, string>({
      query: (id) => `v4/rockets/${id}`,
    })
  })
});
