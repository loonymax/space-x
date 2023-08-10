import { sorting, sortingValues } from "../../const";
import { makeFakeLaunches } from "../../mocks/launches-list-mock";
import { fetchLaunchesAction } from "./api-actions";
import { State, launchesSlice, selectSorting } from "./launches-slice";
import { initialState } from "./launches-slice";

const launches = makeFakeLaunches(5);

const initState: State = {
  launchesList: launches,
  isLoading: false,
  error: '',
  sorting: sorting.high,
}

describe('Reducer: launchesSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(launchesSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  })
  it('should set isLoading to "true" before receiving launches', () => {
    expect(
      launchesSlice.reducer(initialState, { type: fetchLaunchesAction.pending.type })
    ).toEqual({ ...initialState, isLoading: true });
  });
  it('should set loaded launches and isDataLoading to "false"', () => {
    expect(
      launchesSlice.reducer(initialState,
        {
          type: fetchLaunchesAction.fulfilled.type,
          payload: launches,
        })
    ).toEqual({
      ...initialState,
      launchesList: launches.filter((launch) => launch.success === true && launch.date_unix >= 1420063201 && launch.date_unix <= 1577829600).reverse(),
      isLoading: false,
    });
  });
  it('should set isLoading to "false" on launches rejected', () => {
    expect(
      launchesSlice.reducer(initialState, { type: fetchLaunchesAction.rejected.type })
    ).toEqual({ ...initialState, isLoading: false });
  });
  it('should launches are sorted when changing the selected sort to low', () => {
    expect(
      launchesSlice.reducer(initState, {
        type: selectSorting.type,
        payload: sorting.low
      })
    ).toEqual({
      ...initialState,
      sorting: sorting.low,
      launchesList: launches.sort((a, b) => a.date_unix - b.date_unix),
    });
  });
  it('should launches are sorted when changing the selected sort to high', () => {
    expect(
      launchesSlice.reducer(initState, {
        type: selectSorting.type,
        payload: sorting.high
      })
    ).toEqual({
      ...initialState,
      sorting: sorting.high,
      launchesList: launches.sort((a, b) => b.date_unix - a.date_unix),
    });
  });
});

