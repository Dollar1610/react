import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class ModalDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            prodSetting: {
                id:'',
                name:'',
                price:''
            }
        };
        this.deleteProd = this.deleteProd.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    deleteProd() {
            let id = this.state.prodSetting.id;
            console.log(id);
            fetch('api/products/'+id, {
                method: 'delete',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then((response) => {
                if (response.status === 200) this.setState({ showModal: false });
            })
    }
    close() {
        this.setState({ showModal: false });
    }
    open(e) {
        let id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        fetch('/api/products/'+id)
            .then((response) =>{
                response.json()
                    .then((data) =>{
                        console.log(data);
                        this.setState({
                            showModal: true,
                            prodSetting: {
                                id: data.id,
                                name: data.name,
                                price: data.price
                            }
                        });
                        console.log(this.state);
                    })
            })
    }
    render() {
        return(
            <div>
            <Button bsStyle="link" onClick={this.open}>delete</Button>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, want to delete this products?
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.deleteProd} type="submit">Delete</Button>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}