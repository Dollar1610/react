import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table, Button } from 'react-bootstrap';

export default class Customer extends Component {
    render () {
        return (
          <div>
              <div className='container'>
                  <PageHeader className="hd">
                      Customer list
                      <Button className="bt">Create</Button>
                  </PageHeader>
                  <Table responsive>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>phone</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>1</td>
                          <td>Mark Benson</td>
                          <td>353 Rochester St, Rialto FL 43250</td>
                          <td>555-534-2342</td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>Bob Smith</td>
                          <td>215 Market St, Dansville CA 94325</td>
                          <td>555-534-2342</td>
                      </tr>
                      </tbody>
                  </Table>
              </div>
          </div>
        )
    }
}