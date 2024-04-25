import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { Component } from "react";
import withRouter from "./WithRouter.tsx";
interface propsTypes {
  location: {
    state: {
      author: string;
      title: string;
      url: string;
      created_at: string;
      _tags: string[];
    };
  };
  navigate:(data:string) => void;
}

class PostsDetails extends Component<propsTypes> {
  render() {
    const {
      author,title,url,created_at,_tags
    } = this.props.location.state || 'hello';
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
        <Card sx={{ minWidth: 275,mt:5 }}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }}>
                  Title: {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                Author: {author}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                Created At: {created_at}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Tags: {_tags?.join(', ')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} title="linktitle">
                  Link: <a href={url} target="_blank" rel="noreferrer">{url}</a>
                </Typography>
                <Typography sx={{ mt:2,textAlign:'center' }}>
                  <Button color="info" variant="contained" onClick={()=>this.props.navigate('/')}>Go Back</Button>
                </Typography>
              </CardContent>
            </Card>
      </Box>
    );
  }
}

export default withRouter(PostsDetails);
