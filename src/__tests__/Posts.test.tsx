import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Posts from "../Component/Posts.tsx";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("Post Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("Api Mock Test", async () => {
    const mockData = {
      hits: [
        {
          title: "Title 1",
          author: "Author 1",
          url: "http://",
          created_at: "Today",
          _tags: ["tag1", "tag2"],
        },
        {
          title: "Title 1",
          author: "Author 1",
          url: "http://",
          created_at: "Today",
          _tags: ["tag1", "tag2"],
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <Posts navigate={() => {}} />
      </MemoryRouter>
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    jest.advanceTimersByTime(11000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenLastCalledWith(
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1"
    );

    const searchInput = screen.getByLabelText("Search by title and author");
    fireEvent.change(searchInput, { target: { value: "hello" } });
    expect(searchInput).toHaveValue("hello");
    
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
  });
});
