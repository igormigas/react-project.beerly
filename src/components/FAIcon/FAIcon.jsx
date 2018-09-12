import React from 'react';
import PropTypes from 'prop-types';

const FAIcon = (props) => (
	<i className={props.code}></i>
);

FAIcon.propTypes = {
	code: PropTypes.string.isRequired
}

export default FAIcon;