import React, { Component } from 'react';
import '../../../public/bootstrap/css/bootstrap.min.css';
import { PageHeader, Table, Button} from 'react-bootstrap';
import Modals from './buttons/modal';


export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: ''
        };
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {
        this.save();
    }
    delete() {
        const urll = '/api/products/{id}';
        fetch(urll, {
            method: 'delete'
        });
    }
    save() {
        let tdata = [];
        const urll = 'api/products';
        let tbody = document.querySelector('.table tbody');
        fetch(urll).then((response) => {
            response.json().then((data) => {
                for (let i=0; i<data.length; i++) {
                    this.setState({
                        id: data[i].id,
                        name: data[i].name,
                        price: data[i].price
                    });
                    tbody.insertAdjacentHTML('beforeend',
                        '<tr>'
                              +'<td>'+this.state.id+'</td>'
                              +'<td>'+this.state.name+'</td>'
                              +'<td>'+this.state.price+'</td>'
                              +'<td>'+'<Button bsStyle=Link onclick="this.delete">Delete</Button>'+'</td>'+
                        '</tr>'
                    )
                }
                tdata = data.slice(0);
                console.log(data);
                console.log(tdata);
            })
        });
        console.log(tdata);
    }
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

                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}