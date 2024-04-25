import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { Component } from "react";

interface propstypes {
  post: {
    title: string;
    author: string;
    url: string;
    created_at: string;
    _tags: string[];
  };
  navigate: (data: string, state: any) => void;
  intervalId:NodeJS.Timeout;
}

export default class Post extends Component<propstypes> {
  handleClick = (
    postUrl: string,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    window.open(postUrl, "_blank");
  };
  handleNavigate = (post: any) => {
    const { author, title, url, created_at, _tags } = post;
    const data = { author, title, url, created_at, _tags };
    this.props.navigate("/PostDetails", { state: data });
    clearInterval(this.props.intervalId); 
  };
  render() {
    const { post } = this.props;
    const displayDate = new Date(post.created_at).toDateString();
    return (
      <React.Fragment>
        <ListItem
          alignItems="flex-start"
          title="listbox"
          button
          onClick={() => this.handleNavigate(post)}
        >
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{post.title}</span>
                <span
                  style={{ color: "blue", textDecoration: "underline" }}
                  onClick={(event) => this.handleClick(post.url, event)}
                  title="spanclickcheck"
                >
                  Link
                </span>
              </div>
            }
            secondary={`Author: ${post.author}, Tags: ${post._tags.join(
              ", "
            )}, Created At: ${displayDate}`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    );
  }
}
