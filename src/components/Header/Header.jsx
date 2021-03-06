import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.scss';

const header = (props) => {
	return (
		<header className={classes.Header}>
			<Link to="/"><span className={classes.Color}>BEER</span>LY</Link>
			<p>Choose your favorite beverage and make it wait for you in the fridge during next meetup!</p>
		</header>
	);
};

export default header;
