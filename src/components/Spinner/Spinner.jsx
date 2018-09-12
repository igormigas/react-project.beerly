import React from 'react';

import SpinnerComponent from './SpinnerComponent';
import spinnerService from './spinnerService';

class Spinner extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			showSpinner: true,
			showMessage: false
		}

		if (this.props.hasOwnProperty('service')) {
			this.service = this.props.service
		} else {
			this.service = spinnerService;
		}
		
		this.service.register(this);
	}

	componentWillUnmount() {
		this.service.unregister(this);
	}

	get name() {
		return this.props.name;
	}

	get status() {
		return this.state.showSpinner;
	}

	show() {
		this.startTimeout();
		this.setState({showSpinner: true});
	}

	hide() {
		this.stopTimeout();
		this.setState({
			showSpinner: false,
			showMessage: false
		});
	}

	startTimeout() {
		this.timeout = setTimeout(() => {
			this.setState({
				showMessage: true
			});
			console.log('TIMEOUT');
		}, 8000);
	}

	stopTimeout() {
		clearTimeout(this.timeout);
	}

	render() {

		const message = this.state.showMessage ? (
			<div className={classes.Message}>
				Strona może mieć problem z załadowaniem danych...
			</div>
		) : null;

		return (
			this.state.showSpinner ? <SpinnerComponent message={message} /> : null);
	}
}

export default Spinner;