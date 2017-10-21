import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


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
        let content = {
            id: oForm.elements[0].value,
            name: oForm.elements[1].value,
            price: oForm.elements[2].value
        };

        function getRequestBody(oForm) {
            let aParams = [];
            for(let i = 0; i < oForm.elements.length; i++) {
                let sParam = encodeURIComponent(oForm.getElementsByTagName('label')[i].innerHTML);
                sParam += "=";
                sParam += encodeURIComponent(oForm.elements[i].value);
                aParams.push(sParam);
            }
            return '/api/products?' + aParams.join("&");
        }
        let url1 = getRequestBody(document.forms.form1);
        console.log('url='+url1);
        let modal_div = document.getElementsByClassName('modal-body')[0];
        modal_div.insertAdjacentHTML('beforeend', '<div id="dd"></div>');
        fetch(url1, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function(response) {
            document.getElementById('dd').innerHTML=response.json();
        }).catch(function (err) {
            console.log(err)
        })
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