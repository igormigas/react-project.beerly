import React from 'react';
import PropTypes from 'prop-types';

import classes from './Label.scss';

const label = (props) => (
	<div className={classes.Label}>
		{props.children}
	</div>
);

label.propTypes = {
	children: PropTypes.any.isRequired
}

export default label;