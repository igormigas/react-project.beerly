import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.scss';

const modal = (props) => {
	
	let ref = React.createRef();
	
	return (
		<>
			<Backdrop
				show={props.show}
				clicked={props.escapeHandler} />
			<div
				className={classes.Modal}
				ref={ref}
				style={{
					transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -120%)',
					top: props.show ? '50%' : '0%',
				}}>
				{React.cloneElement(props.children, {modalReference: ref})}
			</div>
		</>
	);
};

modal.propTypes = {
	show: PropTypes.bool.isRequired,
	escapeHandler: PropTypes.func.isRequired,
}

export default modal;