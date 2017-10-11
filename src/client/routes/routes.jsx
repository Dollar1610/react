import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history'; 

import MenuApp from '../menu-app/appmenu';

import Customers from '../customers/customers.jsx';
import InvoiceList from '../invoice/invoice-list.jsx';
import Products from '../products/products.jsx'

export const renderRoutes = () => (
	<Router history={history}>
	  <div>
	    <MenuApp />
	    <div class="container-fluid">
         <Route path="/customers" component={Customers}/>
         <Route path="/products" component={Products}/>
         <Route exact={true} path="/invoices" component={InvoiceList}/>
	    </div>
	  </div>
	</Router>
);