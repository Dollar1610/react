import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history'; 

import MenuApp from '../menu-app/appmenu';

import customers from '../customers/customers.jsx';
import invoiceList from '../invoice/invoice-list.jsx';
import products from '../products/products.jsx';
import invoiceEdit from '../invoice/Invoice-Route/invoice-edit/invoice-edit';
import invoiceCreate from '../invoice/Invoice-Route/invoice-create/invoice-create';

export const renderRoutes = () => (
	<Router history={history}>
	  <div>
	    <MenuApp />
	    <div className="container-fluid">
         <Route path="/customers" component={customers}/>
         <Route path="/products" component={products}/>
         <Route exact={true} path="/invoicesList" component={invoiceList}/>
         <Route path="/invoicesList/invoiceCreate" component={invoiceCreate}/>
         <Route path="/invoiceEdit" component={invoiceEdit}/>
	    </div>
	  </div>
	</Router>
);