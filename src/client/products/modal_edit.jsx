import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import getUrl from './../../getUrl';

export default class ModalEdit extends Component{
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
        console.log(props.id);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.save = this.save.bind(this);
        this.deleteProd = this.deleteProd.bind(this);
    }

    deleteProd() {
        let content = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        };
        console.log(content);
        if (content.name==='') {
            if (content.price==='') {
                alert('hi');
                return null;
            }
        }
        const urll=getUrl('',content);
        let id = this.state.prodSetting.id;
        console.log(id);
        fetch('api/products/'+id, {
            method: 'delete',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urll
        })
    }

    save() {
        let content = {
            name: document.getElementById('name').value,
            price: document.getElementById('price').value
        };
        console.log(content);
        if (content.name==='') {
            if (content.price==='') {
                alert('hi');
                return null;
            }
        }
        const urll=getUrl('',content);
        let id = this.state.prodSetting.id;
        console.log(id);
        fetch('api/products/'+id, {
            method: 'put',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urll
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
        return (
            <div>
                <Button bsStyle="link" onClick={this.open}>edit</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit products</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-inline" name="form1">
                            <div className="form-group" style={{marginRight:30+'px'}}>
                                <label htmlFor="name">Name</label>
                                <input placeholder={this.state.prodSetting.name} type="text" className="form-control" id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input placeholder={this.state.prodSetting.price} type="text" className="form-control" id="price"/>
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