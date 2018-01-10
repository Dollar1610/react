import React from 'react';
import ModalDelete from './modals/modal_delete';
import { FormGroup,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function (props) {
    let datas = props.data;
    let changeState = props.changeState;
    let count=-1;
    let listDatas = datas.map((data) => {
        count++;
        return  <tr data-id={count} key={data.toString()+Math.random()*1000}>{transform(data, props.qty, datas, changeState)}</tr>;
    });
    return (
        <tbody>{listDatas}</tbody>
    );
}

function transform(mass, qty, data, changeState) {
    let props = [];
    let count=0;
    for (let key in mass) {
        props.push(mass[key])
    }
    props.push(<ModalDelete changeState={changeState} delete={data} />);
    return props.map((prop) => {
        if (count===2) {
            count++;
            return (
                <td key={prop.toString()}>
                    <FormGroup controlId='formControlText' style={{width: 20 + '%'}}>
                        <FormControl
                            type="text"
                            defaultValue={prop}
                            bsClass="lg"
                            onBlur={qty}
                        />
                    </FormGroup>
                </td>
            );
        }
        count++;
        return <td key={prop.toString()}>{prop}</td>;
    });
}