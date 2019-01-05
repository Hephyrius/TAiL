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
