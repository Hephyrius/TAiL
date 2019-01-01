import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SiteHeader extends Component {

  render() {
    return (
        <div className="header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand"><Link to="/">N!Filter</Link> </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link"> <Link to="/">Home</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/new-post">Create New Post</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/account">Account</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/about">About</Link> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link">  <Link to="/search">Search</Link> </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        );
     }
}

export default SiteHeader;

