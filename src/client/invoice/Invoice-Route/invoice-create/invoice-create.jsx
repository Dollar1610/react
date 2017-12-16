import React, { Component } from 'react';
import { Button, PageHeader,FormGroup,ControlLabel,FormControl,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import selectCustomers from './invoice_select_customers';
import selectProducts from './invoice_select_products';
import LoadTableData from './load-data';
import NumberFormat from 'react-number-format';

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
        this.changeDiscount =this.changeDiscount.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.nameAutoFocus = true;
    }
    componentDidMount() {
        this.loadData();
        this.nameAutoFocus = false;
    }
    sendForm() {
        let content
    }
    changeDiscount(e) {
        if (e.target.value==='') return null;
        if ((e.target.value!=='')&&(e.target.value)) {
            let discount_id = e.target.parentElement.parentElement.parentElement.dataset.id;
            let dataTable=this.state.dataTable;
            dataTable[discount_id].qty = e.target.value;
            let total=0;
            for (let i=0;i<dataTable.length;i++) {
                total += dataTable[i].price*(1-dataTable[i].qty/100);
            }
            this.setState({
                total:total,
                dataTable:dataTable
            });
            console.log('test0');
            return null;
        }
            let dataTable = this.state.dataTable ;
            let discount = document.getElementById('formControlText').value / 100;
            let total = 0;
            for (let i = 0; i < dataTable.length; i++) {
                total += dataTable[i].price
            }
            total = total * (1 - discount);
            this.setState({
                total: total
            });
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
        console.log('test1');
        return selectCustomers(props);
    }

    funcProducts () {
        let props = {
            properties: this.state.products
        };
        selectProducts(props);
        console.log('test2');
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
                            qty: document.getElementById('formControlText').value,
                        });
                        console.log(this.state.dataTable);
                        this.changeDiscount(e);
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
                </tr>
                </thead>
                <LoadTableData focus={this.nameAutoFocus} discount={this.changeDiscount} data={this.state.dataTable} />
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