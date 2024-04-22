import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemAvatar,
  Box,
  Avatar,
  Divider,
} from "@mui/material";

interface StateTypes {
  postsData: {
    title: string;
    author: string;
    url: string;
    created_at: string;
    _tags: string[];
  }[];
  page: number;
  loading: boolean;
}
class PostsDetails extends React.Component<null, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      postsData: [],
      page: 0,
      loading: false,
    };
  }
  componentDidMount(): void {
    this.getApiData(this.state.page);
    this.setIntervalForGetApiData();
  }
  getApiData = async (PN: number) => {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${PN}`
      );
      const data = await response.json();
      const newPosts = data.hits;
      this.setState({
        postsData: [...this.state.postsData, ...newPosts],
        page: this.state.page + 1,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  };
  setIntervalForGetApiData = () => {
    setInterval(() => {
      this.getApiData(this.state.page);
    }, 10000);
  };

  handleClick = (postUrl: string) => {
    window.open(postUrl, "_blank");
  };

  render() {
    return (
      <Box
        component={"div"}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Posts Details
        </Typography>
        <TextField
          label="Search by title"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "20px", width: "90%", ml: 5 }}
        />
        <List
          sx={{
            width: "90%",
            bgcolor: "background.paper",
            maxHeight: "600px",
          }}
        >
          {this.state.postsData?.map((post, idx) => {
            const displayDate = new Date(post.created_at).toDateString();
            return (
              <React.Fragment key={idx}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => this.handleClick(post.url)}
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={post.title}
                    secondary={`Author: ${post.author}, Tags: ${post._tags.join(
                      ", "
                    )}, Created At: ${displayDate}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
          {this.state.loading && <ListItem> Loading....</ListItem>}
        </List>
      </Box>
    );
  }
}

export default PostsDetails;
