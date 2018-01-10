import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ModalDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            id:0
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.deleteInvoices = this.deleteInvoices.bind(this);
    }
    deleteInvoices() {
        let dataTable =[];
        let count=0;
        let id = +this.state.id;
        let total = 0;
        for (let i=0;i<this.props.delete.length;i++) {
            if (count!==id) {
                dataTable.push(this.props.delete[i]);
            }
            count++;
        }
        console.log(dataTable);
        for (let i=0;i<dataTable.length;i++) {
            total+=dataTable[i].qty*dataTable[i].price
        }
        this.props.changeState(dataTable, total);
    }
    close() {
        this.setState({ showModal: false });
    }
    open(e) {
        this.setState({ showModal: true });
        let id=e.target.parentElement.parentElement.parentElement.dataset.id;
        this.setState({id:id});
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
                        <Button bsStyle="primary" onClick={this.deleteInvoices} type="submit">Delete</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}