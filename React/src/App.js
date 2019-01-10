import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Networks from "./components/Networks";
import Predictions from "./components/Predictions";
import SubmissionForm from "./components/SubmissionForm";
import PredictionForm from "./components/PredictionForm";
import About from "./components/About";
import SiteHeader from "./components/SiteHeader";
import NetworkPage from "./components/NetworkPage";
import SiteFooter from "./components/SiteFooter";
import "./bootstrap.css";
import {getNetworks, getPredictions, getNetworkData} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      Networks : getNetworkData(), 
      Predictions:getPredictions()
    }]
    //getNetworkData();
    
    

  }

  
  render() {
    return (
      <Router>   
      <div className="App">
        <div class="container">
          <SiteHeader />

          <Route path="/New-Network" component={NewNetwork} />

          <Route path="/Predictions" component={PredictionsP} />

          <Route path="/Predict" component={Predict} />

          <Route path="/NetworkNumber=:id" component={NetworkP}/>

          <Route path="/" exact component={Home} />

          <Route path="/about" component={AboutP} />

          <SiteFooter />
        </div>
        
      </div>
      </Router>
      
    );
  }
}

const PredictionsP = () => ( <Predictions />);
const NetworkP = ({ match }) => ( <NetworkPage NetworkNumber={match.params.id} />);
const Home = () => ( <Networks />);
const NewNetwork = () => <SubmissionForm /> ;
const Predict = () => <PredictionForm /> ;
const AboutP = ({ match }) => ( <About />);

export default App;
