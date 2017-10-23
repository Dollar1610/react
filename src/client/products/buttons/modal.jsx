import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import getUrl from '../../../getUrl.jsx';

export default class Modals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    save() {
        let count = 2;
        let content = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        };
        const urll=getUrl('api/products?', content);
        console.log(content);
        fetch(urll, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function(response) {
            response.json().then(function(data) {
                console.log(data);
            })
        }).catch(function(err) {
            console.log(err)
        });
        }

    render() {
        return (
            <div>
                <Button
                    bsStyle="default"
                    onClick={this.open}
                >
                    create
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Products</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-inline" name="form1">
                            <div className="form-group" style={{marginRight:30+'px'}}>
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" id="price"/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save} type="submit">Save</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}