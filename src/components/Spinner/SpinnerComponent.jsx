import React from 'react';

import classes from './SpinnerComponent.scss'

const spinnerComponent = (props) => (
	<div className={classes.Spinner}>
		<div className={classes.preloadJuggle}>
			<div></div>
			<div></div>
			<div></div>
		</div>
		{props.message ? message : null}
	</div>
);

export default spinnerComponent;