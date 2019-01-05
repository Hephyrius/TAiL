import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SubmissionForm from "./components/SubmissionForm";
import About from "./components/About";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Search from "./components/Search";
import "./bootstrap.css";
import {getNetworks} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      postData : getNetworks()
    }]

  }

  render() {
    return (
      <Router>   
      <div className="App">
        <div class="container">
          <SiteHeader />

          <Route path="/new-post" component={newpost} />

          <Route path="/" exact component={Home} />

          <Route path="/about" component={AboutP} />

          <SiteFooter />
        </div>
        
      </div>
      </Router>
      
    );
  }
}

const Home = () => ( <Search />);
const newpost = () => <SubmissionForm /> ;
//const TorrentP = ({ match }) => ( <TorrentPage TorrentNumber={match.params.id} />);
const AboutP = ({ match }) => ( <About />);
const SearchP = ({ match }) => ( <Search />);

export default App;
