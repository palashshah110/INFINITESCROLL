import React, { ChangeEvent } from "react";
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
  search:string;
  loading: boolean;
}
class PostsDetails extends React.Component<null, StateTypes> {
  intervalId: NodeJS.Timeout;
  constructor(props: any) {
    super(props);
    this.state = {
      postsData: [],
      page: 0,
      search:'',
      loading: false,
    };
  }
  componentDidMount(): void {
    this.getApiData(this.state.page);
    this.setIntervalForGetApiData();
    // this.createObserver();
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount(): void {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getApiData = async (PN: number) => {
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
        loading: false,
      });
      this.setIntervalForGetApiData();
    } catch (error) {
      this.setState({ loading: false });
    }
  };
  
  setIntervalForGetApiData = () => {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      this.getApiData(this.state.page);
    }, 10000);
  };

  handleChange =(event:ChangeEvent<HTMLInputElement>)=>{
    this.setState({search:event.target.value})
  }
  handleClick = (postUrl: string) => {
    window.open(postUrl, "_blank");
  };

  // createObserver = () => {
  //   let observer:any;
  //   let options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 1
  //   };
    
  //   observer = new IntersectionObserver(this.handleIntersect, options);
  //    console.log(observer);
  // };
  
  
  // handleIntersect = (entries:any, observer:any) => {
  //   console.log('i am in it')
  //   entries.map((entry:any) => console.log(entry));
  // };

  handleScroll = () => {
    const { documentElement} = document;
    const element = documentElement;

    if (Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) <= 1) {
      if (!this.state.loading) {
        this.getApiData(this.state.page);
      }
    }
  };
      
  render() {
    const myapiData = this.state.postsData.filter((item)=>item.title.includes(this.state.search) || item.author.includes(this.state.search) );
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
