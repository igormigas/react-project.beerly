import React from 'react';
import PropTypes from 'prop-types';

import classes from './ListItem.scss';

const listItem = (props) => {	
	const beer = props.data;

	return (
		<article className={classes.ItemContainer}>
			<div className={classes.Item} onClick={props.clickHandler}>
				<img src={beer.image_url} alt={beer.name} />
				<div className={classes.label}>
					<h3>{beer.name}</h3>
					<span>{beer.tagline}</span>
				</div>
			</div>
		</article>
	);
}

listItem.propTypes = {
	data: PropTypes.object.isRequired,
	clickHandler: PropTypes.func
}

export default listItem;