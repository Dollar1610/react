import React from 'react';
import ModalDelete from './modals/modal_delete';
import { FormGroup,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function (props) {
    let datas = props.data;
    let count=-1;
    let listDatas = datas.map((data) => {
        count++;
        return  <tr data-id={count} key={data.toString()+Math.random()*1000}>{transform(data, props.discount, props.focus)}</tr>;
    });
    return (
        <tbody>{listDatas}</tbody>
    );
}

function transform(mass, discount, focus) {
    let props = [];
    let count=0;
    for (let key in mass) {
        props.push(mass[key])
    }
  //  props.push(<ModalDelete loadData={loadData} />);
    return props.map((prop) => {
        if (count===2) return (
        <td key={prop.toString()}>
            <FormGroup  controlId='formControlText' style={{width:20+'%'}}>
                <FormControl
                    type="text"
                    defaultValue={prop}
                    bsClass="lg"
                    onChange={discount}
                    autoFocus={focus}
                    key={1000}
                />
            </FormGroup>
        </td>
    ); console.log('test4');
        count++;
        return <td key={prop.toString()}>{prop}</td>;
    });
}