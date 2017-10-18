import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table } from 'react-bootstrap';
//import ButtonsGroup from './buttons/buttons';
import Modals from './buttons/modal';

export default class Products extends Component {
    render () {
        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Product list
                        <Modals/>
                    </PageHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Parachute Pants</td>
                            <td>29.99</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Phone Holder</td>
                            <td>9.99</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}