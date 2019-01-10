//TAiL is a dApp and Library created for the Tron Accelerator
//The Python library enables training of Neural Network Classifiers
//As well as the export of trained models in JSON Form
//The smart contract allows pretrained models to be used on the TVM
//By allowing users to initialise them via a smart contract deployer system
//The ReactJs front end allows the deployment, initialisation and use of the Neural Networks
//It also allows the exploration of the Neural Networks by allowing users to see Past Predictions
//As Well as Owners and Deployed Addresses.
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/TAiL)

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
    }]
    getNetworkData();
    
    

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
