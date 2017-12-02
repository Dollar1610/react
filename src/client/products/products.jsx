import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table, Button} from 'react-bootstrap';
import Modals from './buttons/modal';
import Product_list from './product_container';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prod_list : []
        };
        this.delete_prod = this.delete_prod.bind(this);
        this.content = this.content.bind(this);
    }
    delete_prod() {
        const urll = '/api/products/{id}';
        fetch(urll, {
            method: 'delete'
        });
    }
    content() {
        if (this.state.prod_list.length === 0) {
            const prod = this.state.prod_list;
            const urll = 'api/products';
            fetch(urll)
                .then((response) => {
                response.json()
                    .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        prod.push({
                            id: data[i].id,
                            name: data[i].name,
                            price: data[i].price
                        });
                    }
                    this.setState({prod_list: prod});
                })
            });
        }
        else {
            const prod = this.state.prod_list;
            const urll = 'api/products';
            fetch(urll)
                .then((response) => {
                response.json()
                    .then((data) => {
                    if (data.length !== this.state.prod_list.length) {
                        prod.push({
                            id: data[length - 1].id,
                            name: data[length - 1].name,
                            price: data[length - 1].price
                        });
                        this.setState({prod_list: prod});
                    }
                })
            })
        }
    }
    componentDidMount() {
        this.content();
    };
    render () {

        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Product list
                        <Modals content={() => this.content()} />
                    </PageHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <Product_list  data = {this.state.prod_list}/>
                    </Table>
                </div>
            </div>
        )
    }
}
console.log(Products);