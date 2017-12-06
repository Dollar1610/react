import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ModalDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            customerSetting: {
                id:'',
                name:'',
                address:'',
                phone:''
            }
        };
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    deleteCustomer() {
            let id = this.state.customerSetting.id;
            fetch('/api/customers/'+id, {
                method: 'delete',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.setState({ showModal: false });
                    this.props.loadData();
                }
            })
    }
    close() {
        this.setState({ showModal: false });
    }
    open(e) {
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        fetch('/api/customers/'+id)
            .then((response) =>{
                response.json()
                    .then((data) =>{
                        this.setState({
                            showModal: true,
                            customerSetting: {
                                id: data.id,
                                name: data.name,
                                address: data.address,
                                phone: data.phone
                            }
                        });
                    })
            })
    }
    render() {
        return(
            <div>
            <Button bsStyle="link" onClick={this.open}>delete</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete customers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, want to delete this customer?
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.deleteCustomer} type="submit">Delete</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}