import React, { Component } from 'react';
import {} from "../utils/tronweb";

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
    this.setState({Values: event.target.value});
  }
  handleValuesChange3(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange4(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange5(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange6(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange7(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange8(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange9(event) {
    this.setState({Values: event.target.value});
  }
  handleValuesChange10(event) {
    this.setState({Values: event.target.value});
  }

  handleSubmit(event) {
    
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

                
                

                <input type="submit" class="btn btn-outline-light" value="Submit Link" />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

  export default PredictionForm;
