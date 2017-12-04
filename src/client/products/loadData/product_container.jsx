import React from 'react';
import ModalEdit from './../modals/modal_edit';
import ModalDelete from './../modals/modal_delete';

export default function (props) {
    let products = props.data;
    let listProducts = products.map((product) => {
      return  <tr data-id={product.id} key={product.id}>{transform(product, props.loadData)}</tr>
});
return (
    <tbody>{listProducts}</tbody>
);
}

function transform(mass, loadData) {
    let props = [];
    let count=0;
    for (let key in mass) {
        props.push(mass[key])
    }
    props.push(<div><ModalEdit loadData={loadData} /><ModalDelete loadData={loadData} /></div>);
    return props.map((prop) => {
        if (count=3) return <td key={prop.toString()}>{prop}</td>;
        count++;
        return <td key={prop.toString()}>{prop}</td>;
    });
}