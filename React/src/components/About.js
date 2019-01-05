import React, { Component } from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="About">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
            <h3>About TAiL</h3>
                <div>
                <p align="justify">
                TAiL Is an AI Library and Deployer. The Library is used to train a neural network using python and user defined data. The Deployer is the front end of the dApp responsible for creating the network on the TVM and interacting with it. Iteraction being prediction on new data.
                The Frontend also allows Historic predictions to be reviewed.
                </p>

                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default About;
