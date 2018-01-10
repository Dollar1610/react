import React, { Component } from 'react';
import { Button, PageHeader,FormGroup,ControlLabel,FormControl,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import selectCustomers from './invoice_select_customers';
import selectProducts from './invoice_select_products';
import LoadTableData from './load-data';
import NumberFormat from 'react-number-format';
import getUrl from '../../../common/getUrl';

export default class InvoiceCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            customers:[],
            valueCustomer:'',
            valueProducts:'',
            dataTable: [],
            total:0
        };
        this.loadData = this.loadData.bind(this);
        this.add = this.add.bind(this);
        this.changeStateCustomer = this.changeStateCustomer.bind(this);
        this.changeStateProduct = this.changeStateProduct.bind(this);
        this.funcCustomers = this.funcCustomers.bind(this);
        this.funcProducts = this.funcProducts.bind(this);
        this.price = this.price.bind(this);
        this.changeQty =this.changeQty.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    changeState(data, total) {
        let discount = document.querySelector('.form-group #formControlText').value/100;
        total*=(1-discount);
        this.setState({
            dataTable:data,
            total:total
        });
    }
    sendForm() {
        let customerId=0;
        fetch('/api/customers/')
            .then((response) => {
                response.json()
                    .then((data) =>{
                        for (let i=0;i<data.length;i++) {
                            if (data[i].name===this.state.valueCustomer) customerId=data[i].id
                        }
                    })
            });
        let content = {
            customer_id:customerId,
            discount:document.getElementById('formControlText').value,
            total:this.state.total
        };
        console.log(content);
        if ((content.name==='')&&(content.address==='')&&(content.phone)) return null;
        fetch('/api/invoices?', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: getUrl('',content)
        }).then((response) => {
            if (response.status === 200) {
                console.log('boya')
            }
    })
    }
    changeQty(e) {
        if (e.target.value==='') return null;
        if ((e.target.value!=='')&&(e.target.value)) {
            let qtyId = e.target.parentElement.parentElement.parentElement.dataset.id;
            let dataTable=this.state.dataTable;
            let discount = document.querySelector('.form-group #formControlText').value/100;
            dataTable[qtyId].qty = e.target.value;
            console.log(dataTable[qtyId].qty+' -- '+dataTable[qtyId].price);
            let total=0;
            for (let i=0;i<dataTable.length;i++) {
                    total += dataTable[i].price*dataTable[i].qty;
            }
            total*=(1-discount);
            console.log(total);
            this.setState({
                total:total,
                dataTable:dataTable
            });
        }
    }
    price(data) {
        let name = this.state.valueProducts.value;
        for(let i=0;i<data.length;i++) if (name===data[i].name)  return  (data[i].price);
    }
    funcCustomers () {
        let props = {
            properties: this.state.customers
        };
        selectCustomers(props);
        return selectCustomers(props);
    }

    funcProducts () {
        let props = {
            properties: this.state.products
        };
        selectProducts(props);
        return selectProducts(props);
    }
    add(e) {
        e.preventDefault();
        e.persist();
        let dataTable = this.state.dataTable ;
        fetch('/api/products')
            .then((response) => {
                return response.json()
                    .then((data) => {
                        dataTable.push({
                            name: this.state.valueProducts.value,
                            price: this.price(data),
                            qty: 1,
                        });
                        let total = 0;
                        for (let i = 0; i < dataTable.length; i++) {
                            total += dataTable[i].price
                        }
                        let discount=document.getElementById('formControlText').value/100;
                        total*=(1-discount);
                        this.setState({
                            total: total,
                            dataTable: dataTable
                        });
                        console.log(this.state.dataTable);
                    });
            });
    }
    changeStateCustomer = (valueCustomer) => {
        this.setState({valueCustomer:valueCustomer});
    };
    changeStateProduct = (valueProduct) => {
        this.setState({valueProducts:valueProduct});
    };
    loadData() {
        let customers=[],
        products = [];
        fetch('/api/products')
            .then((response) =>
                response.json()
                    .then((data) =>{
                        for(let i=0; i<data.length;i++) products[i] = data[i].name
                        this.setState({products:products})
                    })
            );
        fetch('/api/customers')
            .then((response) =>
                response.json()
                    .then((data) =>{
                        for(let i=0; i<data.length;i++) customers[i] = data[i].name;
                        this.setState({customers:customers})
                    })
            )
    }

render() {
    return (
        <div className='container'>
            <PageHeader>Create Invoice</PageHeader>
            <form onSubmit={this.add}>
                <FormGroup  controlId='formControlText' style={{width:20+'%'}}>
                    <ControlLabel>Discount (%)</ControlLabel>
                    <FormControl/>
                </FormGroup>
                <label>Customer</label>
                <Select
                    name="form-field-name"
                    style={{width:40+'%'}}
                    value={this.state.valueCustomer}
                    onChange={this.changeStateCustomer}
                    options={this.funcCustomers()}
                />
                <label>Add products</label>
                <Select
                    name="form-field-name"
                    style={{width:40+'%'}}
                    value={this.state.valueProducts}
                    onChange={this.changeStateProduct}
                    options={this.funcProducts()}
                />
                <Button type="submit" bsStyle="primary">Add</Button>
            </form>
            <Table  responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Option</th>
                </tr>
                </thead>
                <LoadTableData  changeState={this.changeState} qty={this.changeQty} data={this.state.dataTable} />
            </Table>
            <PageHeader>Total:
                <NumberFormat displayType={'text'} value={this.state.total} decimalSeparator={'.'} decimalScale={2}/>
            </PageHeader>
            <Button bsStyle="success" onClick={this.sendForm}>
                Submit
            </Button>
        </div>
    )
}
}