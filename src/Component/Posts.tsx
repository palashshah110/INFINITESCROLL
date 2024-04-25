import React, { ChangeEvent } from "react";
import { Typography, List, ListItem, TextField, Box } from "@mui/material";
import withRouter from "./WithRouter.tsx";
import Post from "./Post.tsx";

interface PropsType {
  navigate: (data: string, state: any) => void;
}
interface StateTypes {
  postsData: {
    title: string;
    author: string;
    url: string;
    created_at: string;
    _tags: string[];
  }[];
  page: number;
  search: string;
  loading: boolean;
}
class Posts extends React.Component<PropsType, StateTypes> {
  intervalId: NodeJS.Timeout;
  myRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      postsData: [],
      page: 0,
      search: "",
      loading: false,
    };
  }
  componentDidMount(): void {
    // this.createObserver();
    this.getApiData(this.state.page);
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getApiData = async (PN: number) => {
    if(this.state.loading){
      return;
    }
    try {
      this.setState({ loading: true });
      clearInterval(this.intervalId);
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${PN}`
      );
      const data = await response.json();
      const newPosts = data.hits;
      this.setState({
        postsData: [...this.state.postsData, ...newPosts],
        page: this.state.page + 1,
      });
      this.setIntervalForGetApiData();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  setIntervalForGetApiData = () => {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.getApiData(this.state.page);
    }, 10000);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
  };

  // handleIntersect = (entries: any) => {
  //   const firstEntry = entries[0];
  //   if (firstEntry.isIntersecting && !this.state.loading) {
  //     this.getApiData(this.state.page);
  //   }
  // };

  // createObserver = () => {
  //   let observer = new IntersectionObserver(this.handleIntersect);
  //   observer.observe(this.myRef.current);
  // };

  handleScroll = () => {
    if (
      Math.abs(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight -
          document.documentElement.scrollTop
      ) <= 1
    ) {
      // if(!this.state?.loading){
        this.getApiData(this.state.page);
      // }
    }
  };

  render() {
    const myapiData = this.state?.postsData.filter(
      (item) =>
        item.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
        item.author.toLowerCase().includes(this.state.search.toLowerCase())
    );
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
          label="Search by title and author"
          variant="outlined"
          fullWidth
          onChange={this.handleChange}
          sx={{ marginBottom: "20px", width: "90%", ml: 5 }}
        />
        <List
          sx={{
            width: "90%",
            bgcolor: "background.paper",
            maxHeight: "600px",
          }}
        >
          {myapiData?.map((post, idx) => {
            return (
              <div key={idx} title="listDiv">
                <Post
                  post={post}
                  navigate={this.props.navigate}
                  intervalId={this.intervalId}
                />
              </div>
            );
          })}
          {this.state.loading && <ListItem>Loading...</ListItem>}
          <ListItem ref={this.myRef}>Content Loaded</ListItem>
        </List>
      </Box>
    );
  }
}

export default withRouter(Posts);
