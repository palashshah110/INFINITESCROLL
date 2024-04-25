import React from "react";
import Posts from './Component/Posts.tsx';
import PostsDetails from "./Component/PostsDetails.tsx";
import {BrowserRouter,Routes,Route } from 'react-router-dom'; 
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Posts/>}/>
      <Route path="/PostDetails" element={<PostsDetails/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
