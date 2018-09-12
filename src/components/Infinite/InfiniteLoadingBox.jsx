import React from 'react';

import Spinner from '../Spinner/Spinner';
import classes from './Infinite.scss'

const infiniteLoadingBox = (props) => (
	<div className={classes.LoadingBox}>
		<Spinner />
	</div>
);

export default infiniteLoadingBox;