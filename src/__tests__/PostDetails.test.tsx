import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import PostsDetails from "../Component/PostsDetails";
import { MemoryRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

const mockState = {
  state: {
    title: "hello",
    author: "hello",
    created_at: "hello",
    _tags: ["hell","o"],
    url: "hello",
  },
};
describe("PostDetails Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Api Mock Test", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/getCountryDetalis", state: mockState.state },
        ]}
      >
        <PostsDetails />
      </MemoryRouter>
    );
    const TitleText = screen.getByText("Title: hello");
    const AuthorText = screen.getByText("Author: hello");
    const CreatedAtText = screen.getByText("Created At: hello");
    const Tagstext = screen.getByText("Tags: hell, o");
    const LinkText = screen.getByTitle('linktitle');
    const backButton = screen.getByText("Go Back");
    expect(TitleText).toBeInTheDocument();
    expect(AuthorText).toBeInTheDocument();
    expect(CreatedAtText).toBeInTheDocument();
    expect(Tagstext).toBeInTheDocument();
    expect(LinkText.innerHTML).toBe('Link: <a href="hello" target="_blank" rel="noreferrer">hello</a>');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(window.location.pathname).toBe('/');
  });
});
