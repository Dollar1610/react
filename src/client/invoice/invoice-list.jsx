import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageHeader, Table, Button} from 'react-bootstrap';
import InvoiceCreate from './Invoice-Route/invoice-create/invoice-create';
import { LinkContainer } from 'react-router-bootstrap';
//import InvoiceEdit from './Invoice-Route/invoice-edit';
//import InvoiceList from './../invoice/loadData/invoices_container';

export default class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceList : []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }


    loadData() {
        const invoiceList = [];
        fetch('api/invoices')
            .then((response) => {
                response.json()
                    .then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            console.log(data[i]);
                            invoiceList.push({
                                id: data[i].id,
                                customer: data[i].customer_id,
                                discount: data[i].discount,
                                total: data[i].total
                            });
                        }
                        console.log(invoiceList);
                        this.setState({ invoiceList });
                    })
            });
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Invoice list
                        <br/>
                        <LinkContainer to="/invoicesList/invoiceCreate" activeClassName="active">
                            <Button bsStyle="default" >
                                create
                            </Button>

                        </LinkContainer>
                    </PageHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        {/* <InvoiceList loadData={this.loadData} data = {this.state.invoiceList}/>*/}
                    </Table>
                </div>
            </div>
        )
    }
}