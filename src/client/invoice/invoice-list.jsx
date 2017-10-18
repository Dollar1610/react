import React, { Component } from 'react';
import { PageHeader, Table, Button } from 'react-bootstrap';
import '../../../public/bootstrap/css/bootstrap.min.css';
import './style.css';

export default class Invoice extends Component {
    render() {
        return (
            <div>
            <div className='container'>
                <PageHeader className="hd">
                    Invoices
                    <Button className="bt">Create</Button>
                </PageHeader>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>customer</th>
                        <th>discount</th>
                        <th>total</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td>edit</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Mark Benson</td>
                        <td>1</td>
                        <td> </td>
                        <td>edit</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            </div>
        )
    }
}
