import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import getUrl from '../../common/getUrl';

export default class ModalCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            warning: 'none'
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
        let content = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        };
        if ((content.name==='')&&(content.price==='')) {
            alert('hi');
            return null;
        }
        const urll=getUrl('',content);
        fetch('api/products?', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urll
        }).then((response) => {
            if (response.status === 200) {
                this.close();
                this.props.loadData();
            }
        }).catch(function(err) {
            if (err) this.setState({ warning: 'block' })
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
                        <Modal.Title>Add products</Modal.Title>
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
                        <Alert style={{display: this.state.warning}} bsStyle="danger">
                            <h4>Oh snap! You got an error!</h4>
                            <p>try again</p>
                        </Alert>
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