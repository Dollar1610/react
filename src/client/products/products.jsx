import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table} from 'react-bootstrap';
import ModalCreate from './modals/modal_create';
import ProductList from './loadData/product_container';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prodList : []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }


    loadData() {
        const prodList = [];
        const urll = 'api/products';

        fetch(urll)
            .then((response) => {
                response.json()
                    .then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            prodList.push({
                                id: data[i].id,
                                name: data[i].name,
                                price: data[i].price
                            });
                        }
                        this.setState({ prodList });
                    })
            });
    }

    render () {
        return (
            <div>
                <div className='container'>
                    <PageHeader className="hd">
                        Product list
                        <ModalCreate loadData={this.loadData} />
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
                        <ProductList loadData={this.loadData} data = {this.state.prodList}/>
                    </Table>
                </div>
            </div>
        )
    }
}