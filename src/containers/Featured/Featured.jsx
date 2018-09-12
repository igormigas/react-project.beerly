import React from 'react';
import PropTypes from 'prop-types';

import FeaturedContainer from '../../components/Featured/FeaturedContainer';
import FeaturedItem from '../../components/Featured/FeaturedItem';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Featured.scss';
import API from '../../axios/api';

//
// Component is being optimized
//

class Featured extends React.Component {

	state = {
		currentBeerID: null,
		similarBeers: [],
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.beerID != prevState.currentBeerID) {
			return {
				currentBeerID: nextProps.beerID,
				similarBeers: [],
			}
		}
		return null;
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (
			nextProps.beerID == this.props.beerID
			&& nextProps.beerData == this.props.beerData
			&& nextState.similarBeers.length == this.state.similarBeers.length
		) {
			return false;
		}
		return true;
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (!this.state.similarBeers.length) {
			this.fetchSimilarBeers();
		}
	}

	onBeerChangeHandler = (id) => {
		this.props.beerChangeHandler(id);
		if(this.props.modalReference) {
			this.props.modalReference.current.scrollTo(0,0);
		}
	}

	fetchSimilarBeers = () => {
		if (this.props.beerData) {
			const { abv, ebc, ibu } = this.props.beerData;
			API.getSimilar(abv, ebc, ibu)
				.then( response => {
					this.setState({
						similarBeers: response.data
					})
				})
				.catch( error => console.log(error));
		}
	}

	random() {
		return Math.round(Math.random());
	}

	// export this calculation to different file?
	calculateSimilarBeers() {
		const data = [...this.state.similarBeers];
		const { id, abv, ebc, ibu } = this.props.beerData;

		let indexOfMyself;
		for (let i=0, len=data.length; i<len; i++) {
			if (data[i]['id'] == id) indexOfMyself = i;
			data[i]['abv_diff'] = Math.abs(abv - data[i]['abv']);
			data[i]['ebc_diff'] = Math.abs(ebc - data[i]['ebc']);
			data[i]['ibu_diff'] = Math.abs(ibu - data[i]['ibu']);
		}
		data.splice(indexOfMyself, 1);

		const array_abv = [...data];
		array_abv.sort( (a,b) => {
			return a.abv_diff - b.abv_diff;
		});

		const array_ebc = [...data];
		array_ebc.sort( (a,b) => {
			return a.ebc_diff - b.ebc_diff;
		});

		const array_ibu = [...data];
		array_ibu.sort( (a,b) => {
			return a.ibu_diff - b.ibu_diff;
		});

		return {
			abv: array_abv[this.random()],
			ebc: array_ebc[this.random()],
			ibu: array_ibu[this.random()],
		}
	}

	render() {
		let featured;

		if (this.state.currentBeerID) {
			featured = <Spinner />

			if (this.state.similarBeers.length) {
				const featuredData = this.calculateSimilarBeers();

				featured = (
					<FeaturedContainer>
						{['abv', 'ebc', 'ibu'].map( (param, i) => (
							<FeaturedItem
								key={i}
								data={featuredData[param]}
								param={param}
								clickEvent={this.onBeerChangeHandler} />
						))}
					</FeaturedContainer>
				);
				// TODO: prevent displaying same beer and get rid of 'i' in favour of beers' IDs
			}
		}

		return (
			<div className={classes.Featured}>
				{featured}
			</div>
		);
	}
}

Featured.propTypes = {
	beerID: PropTypes.number,
	beerData: PropTypes.object,
	beerChangeHandler: PropTypes.func,
	modalReference: PropTypes.object,
}

export default Featured;
