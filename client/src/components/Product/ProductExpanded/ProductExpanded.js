import React, { Component } from 'react';

class ProductExpanded extends Component {
	state = {
		id: '',
		name: '',
		quantity: 1
	}

	componentDidMount () {
		this.setState({
			id: this.props.product._id,
			name: this.props.product.name,
			quantity: 1
		});
	}

	handleChange = (e) => {
		this.setState({quantity: e.target.value});
	}

	render () {
		let quantityList = <p>Sorry, the selected item is currently out of stock.</p>;

		if (this.props.product.quantity > 0) {
			let options = [];
			for (let i = 1; i <= this.props.product.quantity; i++) {
				options.push(<option key={i} value={i}>{i}</option>);
			}
			quantityList = <select value="1" onChange={this.handleChange}>{options}</select>;
		}

		return (
			<>
				<h3>{this.props.product.name}</h3>
				<p>{this.props.product.description}</p>
				{quantityList}
				<button onClick={() => this.props.add({...this.state})}>Add to cart</button>
			</>
		);
	}
};

export default ProductExpanded;