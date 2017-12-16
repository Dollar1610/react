import React from 'react';
import 'react-select/dist/react-select.css';

export default function test(props) {
    let customers = props.properties;
    if (!customers) return null;
    return customers.map((customer) => {
        return {value: customer, label: customer}
    });
}