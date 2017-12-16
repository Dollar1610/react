import React, { Component } from 'react';

import './nav.css';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { Navbar, NavItem, Nav} from "react-bootstrap";
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

export default class MenuApp extends Component {

  render() {
  	return (
      <header>
          <Navbar collapseOnSelect >
              <Navbar.Header>
                  <Navbar.Brand>
                      <a href="#">Invoice App</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
              <Nav>
                  <IndexLinkContainer  to="/invoicesList" activeClassName="active">
                      <NavItem eventKey={1} href="#">
                          Invoices
                      </NavItem>
                  </IndexLinkContainer>
                  <LinkContainer to="/products" activeClassName="active">
                       <NavItem eventKey={2} href="#">
                          Products
                       </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/customers" activeClassName="active">
                       <NavItem eventKey={2} href="#">
                          Customers
                       </NavItem>
                  </LinkContainer>
              </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>
  );
 }
}

