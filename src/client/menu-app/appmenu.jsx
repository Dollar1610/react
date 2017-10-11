import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import history from '../routes/history.js';
import './nav.scss';

export default class MenuApp extends Component {
  constructor(props) {
  	super(props);
  	
  }

  render() {
  	return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav nav-bar">
              <li>
                <NavLink exact to="invoices">
                  Invoices
                </NavLink>
              </li>
              <li>
                <NavLink to="products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="customers">
                  Customers
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>  
      </header>
  );
 };
};