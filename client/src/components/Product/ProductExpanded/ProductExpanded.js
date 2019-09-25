import React, { Component } from 'react';

class ProductExpanded extends Component {
	state = {
		quantity: 1
	}

	handleChange = (e) => {
		this.setState({quantity: parseInt(e.target.value)});
	}

	handleAdd = () => {
		// reset
		this.setState({quantity: 1});
		this.props.add(this.state.quantity);
	}

	render () {
		let quantityList = <p>Sorry, the selected item is currently out of stock.</p>;

		if (this.props.product.quantity > 0) {
			let options = [];
			for (let i = 1; i <= this.props.product.quantity; i++) {
				options.push(<option key={i} value={i}>{i}</option>);
			}
			quantityList = <select value={this.state.quantity} onChange={this.handleChange}>{options}</select>;
		}

		return (
			<>
				<h3>{this.props.product.name}</h3>
				<p>{this.props.product.description}</p>
				{quantityList}
				<button onClick={this.handleAdd}>Add to cart</button>
			</>
		);
	}
};

export default ProductExpanded;