import { configureMockStore } from "@jedmao/redux-mock-store";
import { Sorting } from "./sorting";
import { render, screen } from "@testing-library/react";
import { sorting } from "../../const";
import { Provider } from "react-redux";

const mockStore = configureMockStore();
const fakeStore = mockStore({
  sorting: sorting.low,
});

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <Sorting />
      </Provider>
    );

    expect(screen.getByText(sorting.low)).toBeInTheDocument();
  });
});
