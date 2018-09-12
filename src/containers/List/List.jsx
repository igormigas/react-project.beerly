import React from 'react';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


import Details from '../Details/Details';
import ListItem from '../../components/ListItem/ListItem';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

import InfiniteLoadingBox from '../../components/Infinite/InfiniteLoadingBox';
import InfiniteEndingBox from '../../components/Infinite/InfiniteEndingBox';

import classes from './List.scss';
import API from '../../axios/api';

class List extends React.Component {
	
	state = {
		beers: [],
		beersLoaded: false,
		crates: 0,
		beersPerLoad: 20,
		endOfList: false,
		showDetailsModal: this.props.match.params.id ? true : false,
		showDetailsID: this.props.match.params.id ? +this.props.match.params.id : null,
	}

	componentDidMount() {
		this.apiFetchBeers();
	}

	apiFetchBeers = () => {
		API.getSome(this.state.beersPerLoad, this.state.crates + 1)
			.then( response => {
				this.setState({
					beers: this.state.beers.concat(response.data),
					beersLoaded: true,
					crates: this.state.crates + 1,
				});
				if (response.data.length < this.state.beersPerLoad) {
					this.setState({
						endOfList: true,
					})
				}
			})
			.catch( error => {
				console.log(error);
			});
	}

	onClickItemHandler = (id) => {
		this.setState({
			showDetailsModal: true,
			showDetailsID: id,
		})
	}

	onEscapeItemHandler = () => {
		this.setState({
			showDetailsModal: false,
		})
	}

	getMappedListItems = () => {
		return (
			<div className={classes.Container}>
				{this.state.beers.map( obj => (
					<ListItem
						key={obj.id}
						data={obj}
						clickHandler={() => this.onClickItemHandler(obj.id)} />
				))}
			</div>
		)
	}

	render() {		

		const infiniteScroll = this.state.beers.length ? (
			<InfiniteScroll
				dataLength={this.state.beers.length}
				next={this.apiFetchBeers}
				hasMore={!this.state.endOfList}
				loader={<InfiniteLoadingBox />}
				endMessage={<InfiniteEndingBox>That's all folks!</InfiniteEndingBox>}
				scrollThreshold="600px"
				style={{overflow: 'visible'}}>
				{this.getMappedListItems()}
			</InfiniteScroll>
		) : <InfiniteLoadingBox />;		

		return (
			<>
				<Modal
					show={this.state.showDetailsModal}					
					escapeHandler={this.onEscapeItemHandler}>
					<Details
						beerID={this.state.showDetailsID}
						escapeEvent={this.onEscapeItemHandler} />
				</Modal>
				{ infiniteScroll }
			</>
		);
	}
}

export default withRouter(List);
