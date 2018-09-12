import React from 'react';
import PropTypes from 'prop-types';

import FAIcon from '../FAIcon/FAIcon';
import Button from '../Button/Button';
import classes from './DetailsBody.scss'

const detailsBody = (props) => {
	
	const beer = props.beerData;
	return (
		<>
			<div className={classes.Close} onClick={props.escapeEvent}>
				<FAIcon code="fas fa-times" />
			</div>
			<div className={classes.Image}>
				<img src={beer.image_url} alt={beer.name} />
			</div>
			<div className={classes.Info}>
				<h3>{beer.name}</h3>
				<span className={classes.Tagline}>{beer.tagline}</span>
				<ul className={classes.Parameters}>
					<li><span>ABV:</span> {beer.abv}</li>
					<li><span>EBC:</span> {beer.ebc}</li>
					<li><span>IBU:</span> {beer.ibu}</li>
				</ul>
				<p className={classes.Description}>{beer.description}</p>
				<div className={classes.Tips}>
					<p>Tips from brewers:</p>
					<p className={classes.Description}>{beer.brewers_tips}</p>
				</div>
				<div style={{textAlign: 'center'}}>
					<Button clickEvent={props.confirmEvent}>Get me this one!</Button>
				</div>
			</div>
		</>
	);
};

detailsBody.propTypes = {
	beerData: PropTypes.object.isRequired,
	confirmEvent: PropTypes.func,
	escapeEvent: PropTypes.func,
}

export default detailsBody;