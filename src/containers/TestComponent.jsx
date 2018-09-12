import React from 'react';

//import classes from './TestComponent.css'

class TestComponent extends React.Component {
	
	constructor(props) {
		super(props);
		console.log('[TEST COMPONENT] constructor')
		this.state = {
			property: 1,
		}
	}

	changeState = () => {
		console.log('[TEST COMPONENT] func changeState');
		this.setState({
			property: 2
		})
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('[TEST COMPONENT] getDerivedStateFromProps', nextProps, prevState);
		return null;
	}

	shouldComponentUpdate(nextProp, nextState) {
		console.log('[TEST COMPONENT] shouldComponentUpdate', nextProp,  nextState, this.state);
		return true;
	}

	componentDidMount() {
		console.log('[TEST COMPONENT] componentDidMount');
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('[TEST COMPONENT] componentDidUpdate', prevProps,  prevState, this.state);
	}

	render() {
		console.log('[TEST COMPONENT] render')
		return (
			<div style={{height: '100px', width: '100px', backgroundColor: 'black'}}
			onClick={this.changeState} />
		);
	}
}

export default TestComponent;