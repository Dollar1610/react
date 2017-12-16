import React from 'react';
import 'react-select/dist/react-select.css';

export default function test(props) {
    let products = props.properties;
    if (!products) return null;
    return products.map((product) => {
        return {value: product, label: product}
    });
}