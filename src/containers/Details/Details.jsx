import React from 'react';

import DetailsBody from '../../components/Details/DetailsBody';
import Featured from '../Featured/Featured';
import Spinner from '../../components/Spinner/Spinner';
import Label from '../../components/Label/Label';

import classes from './Details.scss';
import API from '../../axios/api';

class Details extends React.Component {
	
	state = {
		beerID: null,
		prevBeerID: null,
		beerData: null,
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.beerID != prevState.prevBeerID) {
			return {
				beerID: nextProps.beerID,
				prevBeerID: nextProps.beerID,
			}
		}
		return null;
	}

	componentDidMount() {
		if(this.state.beerID) {
			this.fetchBeer(this.state.beerID);
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.beerID != prevState.beerID) {
			this.fetchBeer(this.state.beerID);
		}
	}

	onBeerChangeHandler = (id) => {
		this.setState({
			beerID: id,
			beerData: null,
		})
	}

	onBeerRequestHandler = () => {
		alert('Soon..')
	}

	fetchBeer = (id) => {
		API.getOne(id)
			.then( response => {
				this.setState({
					beerData: response.data[0],
				})
			})
	}

	render() {		
		let details;
		if (this.state.beerID) {
			details = <Spinner />;

			if (this.state.beerData) {
				details = <DetailsBody beerData={this.state.beerData} confirmEvent={this.onBeerRequestHandler} escapeEvent={this.props.escapeEvent} />
			}
		}

		return (
			<>
				<div className={classes.Details}>
					{details}
				</div>
				<Featured
					beerID={this.state.beerID}
					beerData={this.state.beerData}
					beerChangeHandler={this.onBeerChangeHandler}
					modalReference={this.props.modalReference} />
			</>
		);
	}
}

export default Details;