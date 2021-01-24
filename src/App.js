import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserPosts from './components/UserPosts'
import Header from './components/Header';
import PostDetails from './components/PostDetails';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/users-posts/userid/:id" component={UserPosts} />
          <Route exact path={`/post-details/userid/:uid&:pid`} component={PostDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
