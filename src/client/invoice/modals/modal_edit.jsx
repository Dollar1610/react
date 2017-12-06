import React, { Component } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import getUrl from './../../common/getUrl';

export default class ModalEdit extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            customerSetting: {
                id:'',
                name:'',
                address:'',
                phone:''
            },
            warning: 'none'
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.deleteProd = this.deleteProd.bind(this);
    }

    deleteProd() {
        let content = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
        };
        if ((content.name==='')&&(content.address==='')&&(content.phone==='')) return null;
        const urll=getUrl('',content);
        let id = this.state.customerSetting.id;
        fetch('api/customers/'+id, {
            method: 'delete',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urll
        })
    }

    save(e) {
        e.preventDefault();
        let content = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
        };
        if ((content.name==='')&&(content.address==='')&&(content.phone==='')) return null;
        const urll=getUrl('',content);
        let id = this.state.customerSetting.id;
        fetch('api/customers/'+id, {
            method: 'put',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: urll
        }).then((response) => {
            if (response.status === 200) {
                this.setState({ showModal: false });
                this.props.loadData();
            }
        }).catch(function(err) {
          //  if (err) this.setState({ warning: 'block' })
        });
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
                console.log(data);
                    this.setState({
                        showModal: true,
                        customerSetting: {
                            id: data.id,
                            name: data.name,
                            address: data.address,
                            phone: data.phone
                        }
                    })
                })
            })
    }
    render() {
        return (
            <div>
                <Button bsStyle="link" onClick={this.open}>edit</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit customers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-inline" name="form1">
                            <div className="form-group" style={{marginRight:30+'px'}}>
                                <label htmlFor="name">Name</label>
                                <input defaultValue={this.state.customerSetting.name} type="text" className="form-control" id="name" />
                            </div>
                            <div className="form-group" style={{marginRight:30+'px'}}>
                                <label htmlFor="address">Address</label>
                                <input defaultValue={this.state.customerSetting.address} type="text" className="form-control" id="address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input defaultValue={this.state.customerSetting.phone} type="text" className="form-control" id="phone"/>
                            </div>
                        </form>
                        <Alert style={{display: this.state.warning}} bsStyle="danger">
                            <h4>Oh snap! You got an error!</h4>
                            <p>try again</p>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={(e) => this.save(e)} type="submit">Save</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}