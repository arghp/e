import React from 'react';

import styles from './Product.module.css';

const product = (props) => (
    <article className={styles.Product}>
        <h2>{props.name}</h2>
        <div className="Info">
            <div className={styles.Description}>{props.description}</div>
        </div>
    </article>
);

export default product;