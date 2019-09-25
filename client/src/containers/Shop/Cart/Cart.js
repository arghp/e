import React from 'react';

import styles from './Cart.module.css';

const Cart = (props) => {
	let cartList = <p>Start adding products to your cart!</p>

	if (props.currentCart.length > 0) {
		let items = []
		items = props.currentCart.map((item, i) => {
			console.log(item.id);
			return <li key={`${i}_${item.id}`} >
						{item.name} x {item.quantity}
						<span key={`${i}_${item.name}`} className={styles.remove} onClick={() => props.removeItem(item.id)}>
							&#215;
						</span>
					</li>;
		});
		cartList = <ul className={styles.CartItems}>{items} </ul>;
	}

	return (
		<div>
			<section className={styles.Cart}>
				{cartList}
			</section>
		</div>
	);
}


export default Cart;