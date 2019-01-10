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
import Networks from "./Networks";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
          search: ''
        };
    
        this.handleSearchChange = this.handleSearchChange.bind(this);
      }
    
      handleSearchChange(event) {
        this.setState({search: event.target.value});
      }
    
    
      render() {
        return (
            <div id="container" class="container">
                <div class="row text-black">
                    <div class="col-sm-10 offset-sm-1 text-center">
                        <h3 class="display-3">TAiL</h3>
                        <h5 class="display-5">Search Torrents</h5>
                            <div class="info-form">
                                <form>  
                                    <div class="form-group">
                                        <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    <Networks />
                </div>
            </div>
        );
      }
    }


export default Search;
