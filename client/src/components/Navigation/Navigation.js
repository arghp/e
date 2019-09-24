import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = (props) => (
	<header className={styles.Navigation}>
		<nav>
			<ul className={styles.NavigationItems}>
				<li className={styles.NavigationItem}>
					<NavLink to="/">Products</NavLink>
				</li>
				<li className={styles.NavigationItem}>
					<NavLink to="/cart/">Cart</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default Navigation;