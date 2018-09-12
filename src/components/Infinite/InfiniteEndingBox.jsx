import React from 'react';
import PropTypes from 'prop-types';

import classes from './Infinite.scss'

const infiniteEndingBox = (props) => (
	<div className={classes.WarningBox}>
		That's all folks!
	</div>
);

infiniteEndingBox.propTypes = {
	children: PropTypes.any.isRequired
}

export default infiniteEndingBox;