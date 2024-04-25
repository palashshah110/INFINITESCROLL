import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import Post from "../Component/Post.tsx";

fetchMock.enableMocks();
const mockprops = {
  title: "Title 1",
  author: "Author 1",
  url: "http://",
  created_at: "Today",
  _tags: ["tag1", "tag2"],
};
describe("Post Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Api Mock Test", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/", state: mockprops }]}>
        <Post
          post={mockprops}
          navigate={() => {}}
          intervalId={setTimeout(() => {}, 1000)}
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    
    expect(
      screen.getByText(
        "Author: Author 1, Tags: tag1, tag2, Created At: Invalid Date"
      )
    ).toBeInTheDocument();
    
    const linkbtn = screen.getByText("Link");
    
    expect(linkbtn).toBeInTheDocument();
    const spanclickcheck = screen.getByTitle("spanclickcheck");
    fireEvent.click(spanclickcheck);


    const listbox = screen.getByTitle("listbox");
    fireEvent.click(listbox);
    
    jest.useFakeTimers();
    
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
      jest.clearAllTimers();
    });
  });
});
