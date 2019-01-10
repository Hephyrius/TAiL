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
import {Predict} from "../utils/tronweb";

class PredictionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NetworkNumber: 0,
      Values1: '',
      Values2: '',
      Values3: '',
      Values4: '',
      Values5: '',
      Values6: '',
      Values7: '',
      Values8: '',
      Values9: '',
      Values10: ''
    };

    this.handleNetworkChange = this.handleNetworkChange.bind(this);
    this.handleValuesChange1 = this.handleValuesChange1.bind(this);
    this.handleValuesChange2 = this.handleValuesChange2.bind(this);
    this.handleValuesChange3 = this.handleValuesChange3.bind(this);
    this.handleValuesChange4 = this.handleValuesChange4.bind(this);
    this.handleValuesChange5 = this.handleValuesChange5.bind(this);
    this.handleValuesChange6 = this.handleValuesChange6.bind(this);
    this.handleValuesChange7 = this.handleValuesChange7.bind(this);
    this.handleValuesChange8 = this.handleValuesChange8.bind(this);
    this.handleValuesChange9 = this.handleValuesChange9.bind(this);
    this.handleValuesChange10 = this.handleValuesChange10.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNetworkChange(event) {
    this.setState({NetworkNumber: event.target.value});
  }

  handleValuesChange1(event) {
    this.setState({Values1: event.target.value});
  }
  handleValuesChange2(event) {
    this.setState({Values2: event.target.value});
  }
  handleValuesChange3(event) {
    this.setState({Values3: event.target.value});
  }
  handleValuesChange4(event) {
    this.setState({Values4: event.target.value});
  }
  handleValuesChange5(event) {
    this.setState({Values5: event.target.value});
  }
  handleValuesChange6(event) {
    this.setState({Values6: event.target.value});
  }
  handleValuesChange7(event) {
    this.setState({Values7: event.target.value});
  }
  handleValuesChange8(event) {
    this.setState({Values8: event.target.value});
  }
  handleValuesChange9(event) {
    this.setState({Values9: event.target.value});
  }
  handleValuesChange10(event) {
    this.setState({Values10: event.target.value});
  }

  handleSubmit(event) {
    
    let values = [this.state.Values1,this.state.Values2,this.state.Values3,this.state.Values4,this.state.Values5,this.state.Values6,this.state.Values7,this.state.Values8,this.state.Values9, this.state.Values10]
    Predict(this.state.NetworkNumber, values)
    event.preventDefault();
  }

  render() {
    
    return (
      <div className="PredictionForm">
        <div class="container">
            <div class="row">
              <form onSubmit={this.handleSubmit}>
              <h3>Predict</h3>

              <h6>Make a prediction by submitting values to a network </h6>

                <label> NetworkNumber </label>
                  <div>
                    <input type="Number" value={this.state.NetworkNumber} onChange={this.handleNetworkChange} />
                  </div>
                <p> </p>

                <label> Input Values </label>
                  <div>
                    <input type="Number" value={this.state.Values1} onChange={this.handleValuesChange1} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values2} onChange={this.handleValuesChange2} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values3} onChange={this.handleValuesChange3} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values4} onChange={this.handleValuesChange4} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values5} onChange={this.handleValuesChange5} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values6} onChange={this.handleValuesChange6} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values7} onChange={this.handleValuesChange7} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values8} onChange={this.handleValuesChange8} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values9} onChange={this.handleValuesChange9} />
                  </div>
                  <div>
                    <input type="Number" value={this.state.Values10} onChange={this.handleValuesChange10} />
                  </div>

                
                

                <input type="submit" class="btn btn-outline-dark" value="Make Prediction" />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

  export default PredictionForm;
