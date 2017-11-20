import React from 'react';
import ModalEdit from './modal_edit';
import ModalDelete from './modal_delete';

export default function (props) {
    let products = props.data;
    let list_products = products.map((product) => {
      return  <tr data-id={product.id} key={product.id}>{transform(product)}</tr>
});
return (
    <tbody>{list_products}</tbody>
);
}

function transform(mass) {
    let props = [];
    let count=0;
    for (let key in mass) {
        props.push(mass[key])
    }
    console.log(props);
    props.push(<div><ModalEdit/><ModalDelete/></div>);
    return props.map((prop) => {
        if (count=3) return <td key={prop.toString()}>{prop}</td>;
        count++;
        console.log(count);
        return <td key={prop.toString()}>{prop}</td>;
    });
}