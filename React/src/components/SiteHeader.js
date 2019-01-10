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

class SiteHeader extends Component {

  render() {
    return (
        <div className="header">
            <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
                <a class="navbar-brand"><Link to="/">TAiL</Link> </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/about">About</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/New-Network">Create New Network</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/Predict">Make Prediction</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/">Networks</Link> </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        );
     }
}

export default SiteHeader;

