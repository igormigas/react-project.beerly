import React from 'react';
import PropTypes from 'prop-types';

import classes from './FeaturedItem.scss'

const featuredItem = (props) => {
	const beer = props.data;

	const onClickHandler = () => {
		props.clickEvent(beer.id);
	}

	return (
		<div
			className={classes.FeaturedItem}
			onClick={onClickHandler}>
			<div className={classes.Image}>
				<img src={beer.image_url} />
			</div>
			<div className={classes.Details}>
				<h4>{beer.name}</h4>
				{props.param.toUpperCase()}: {beer[props.param]}
			</div>
		</div>
	);
};

featuredItem.propTypes = {
	data: PropTypes.object.isRequired,
	param: PropTypes.string.isRequired,
	clickEvent: PropTypes.func.isRequired,
}

export default featuredItem;
