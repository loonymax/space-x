import MockAdapter from "axios-mock-adapter";
import { createAPI } from "../../services/axios";
import thunk, { ThunkDispatch } from "redux-thunk";
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from "./launches-slice";
import { Action } from "@reduxjs/toolkit";
import { makeFakeLaunches } from "../../mocks/launches-list-mock";
import { fetchLaunchesAction } from "./api-actions";

const launches = makeFakeLaunches(10);

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should fetchLaunchesAction when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet('v5/launches').reply(200, launches);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchLaunchesAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchLaunchesAction.pending.type,
      fetchLaunchesAction.fulfilled.type,
    ]);
  });


  it('should fetchLaunchesAction when server returns 400', async () => {
    const store = mockStore();
    mockAPI.onGet('v5/launches').reply(400, launches);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchLaunchesAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchLaunchesAction.pending.type,
      fetchLaunchesAction.rejected.type,
    ]);
  });
});
