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
                  </Table>
              </div>
          </div>
        )
    }
}