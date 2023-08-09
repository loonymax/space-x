import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILaunches } from "../../types/i-launches";
import { fetchLaunchesAction } from "./api-actions";
import { sorting } from "../../const";

interface UserState {
  launchesList: ILaunches[];
  isLoading: boolean;
  error: string;
  sorting: string | null;
}

const initialState: UserState = {
  launchesList: [],
  isLoading: false,
  error: '',
  sorting: sorting.high,
}

export const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    selectSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;

      switch (state.sorting) {
        case sorting.high:
          state.launchesList.sort((a, b) => b.date_unix - a.date_unix);
          break;
        case sorting.low:
          state.launchesList.sort((a, b) => a.date_unix - b.date_unix);
          break;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLaunchesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLaunchesAction.fulfilled, (state, action) => {
        state.launchesList = action.payload;
        state.launchesList = state.launchesList.filter((launch) => launch.success === true && launch.date_unix >= 1420063201 && launch.date_unix <= 1577829600).reverse();
        state.isLoading = false;
      })
      .addCase(fetchLaunchesAction.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export default launchesSlice.reducer;
export const {selectSorting} = launchesSlice.actions;
