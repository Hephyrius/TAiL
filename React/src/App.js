import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Networks from "./components/Networks";
import SubmissionForm from "./components/SubmissionForm";
import PredictionForm from "./components/PredictionForm";
import About from "./components/About";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
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

          <Route path="/New-Network" component={NewNetwork} />

          <Route path="/Predict" component={Predict} />

          <Route path="/" exact component={Home} />

          <Route path="/about" component={AboutP} />

          <SiteFooter />
        </div>
        
      </div>
      </Router>
      
    );
  }
}

const Home = () => ( <Networks />);
const NewNetwork = () => <SubmissionForm /> ;
const Predict = () => <PredictionForm /> ;
const AboutP = ({ match }) => ( <About />);

export default App;
