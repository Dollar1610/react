import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table} from 'react-bootstrap';
import ModalCreate from './modals/modal_create';
import CustomerList from './../customers/loadData/customers_container';

export default class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList : []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }


    loadData() {
        const customerList = [];

        fetch('api/customers/')
            .then((response) => {
                response.json()
                    .then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            customerList.push({
                                id: data[i].id,
                                name: data[i].name,
                                address: data[i].address,
                                phone: data[i].phone
                            });
                        }
                        this.setState({ customerList });
                    })
            });
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Customer list
                        <ModalCreate loadData={this.loadData} />
                    </PageHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>phone</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <CustomerList loadData={this.loadData} data = {this.state.customerList}/>
                    </Table>
                </div>
            </div>
        )
    }
}