import React from 'react';

export default function (props) {
    let customers = props.data;
    let listCustomers = customers.map((customer) => {
      return  <tr data-id={customer.id} key={customer.id}>{transform(customer)}</tr>
});
return (
    <tbody>{listCustomers}</tbody>
);
}

function transform(mass) {
    let props = [];
    let count=0;
    for (let key in mass) {
        props.push(mass[key])
    }
    return props.map((prop) => {
        if (count=3) return <td key={prop.toString()}>{prop}</td>;
        count++;
        return <td key={prop.toString()}>{prop}</td>;
    });
}