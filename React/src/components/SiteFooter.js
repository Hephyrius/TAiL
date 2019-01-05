import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SiteFooter extends Component {

  render() {
    return (
        <div className="header">
            <footer class="page-footer font-small blue">
                <div class="footer-copyright text-center py-3">© TAiL 2019
                    <p> Disclaimer: All content displayed on this website is user submitted. Nothing is stored, promoted or provided by TAiL. User discretion is advised </p>
                    <p> <Link to="/">Home</Link> | <Link to="/new-post">Submit Magnet Link</Link> | <Link to="/about">About</Link></p>
                </div>
            </footer>
        </div>
        );
     }
}

export default SiteFooter;

