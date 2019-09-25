import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Product from '../../../components/Product/Product';
import styles from './Products.module.css';


class Products extends Component {
	state = {
		products: [],
		isPurchasing: false,
		error: false
	}

	async componentDidMount () {
		try {
			const response = await axios.get('http://localhost:5000/products');
			console.log(response);
			this.setState({
				products: response.data
			});
		} catch (error) {
			console.log(error);
			this.setState({error: true});
		}		
	}

	render () {
		let products = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
		if (!this.state.error) {
			products = this.state.products.map(product => {
				return <Product key={product._id} name={product.name} description={product.description} />;
			});
		}

		return (
			<div>
                <section className={styles.Products}>
                    {products}
                </section>
            </div>
		)


	}
}

export default Products;