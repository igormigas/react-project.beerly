import React from 'react';
import PropTypes from 'prop-types';

import classes from './FeaturedContainer.scss'

const featuredContainer = (props) => (
	<>
		You might also like:
		<div className={classes.FeaturedContainer}>
			{props.children}
		</div>
	</>
);

featuredContainer.propTypes = {
	children: PropTypes.any.isRequired
}

export default featuredContainer;