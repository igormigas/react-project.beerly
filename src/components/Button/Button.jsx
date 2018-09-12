import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.scss'

const button = (props) => {
	return (
		<button
			className={classes.Button}
			onClick={props.clickEvent}>
			{props.children}
		</button>
	);
};

button.propTypes = {
	children: PropTypes.string.isRequired,
	clickEvent: PropTypes.func.isRequired,
}

export default button;