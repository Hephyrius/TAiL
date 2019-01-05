import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SiteFooter extends Component {

  render() {
    return (
        <div className="header">
            <footer class="page-footer font-small blue">
                <div class="footer-copyright text-center py-3">© TAiL 2019
                    <p><Link to="/about">About</Link> | <Link to="/New-Network">Create New Network</Link> | <Link to="/Predict">Make Prediction</Link> | <Link to="/">Networks</Link></p>
                </div>
            </footer>
        </div>
        );
     }
}

export default SiteFooter;

