import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import classes from './Layout.scss';

class Layout extends React.Component {

	getRandomBackgroundImage() {
		const dir = '/assets/stock/';
		const backgrounds = [
			{
				url: dir + 'pexels-photo-1267323.jpeg',
				offset: '35%',
			},
			{
				url: dir + 'pexels-photo-1267696.jpeg',
				offset: '35%',
			},
			{
				url: dir + 'pexels-photo-1269025.jpeg',
				offset: '45%',
			}
		];

		return backgrounds[Math.floor(Math.random()*backgrounds.length)];
	}

	render() {
		let background = this.getRandomBackgroundImage();

		return (
			<div className={'App ' + classes.App}>
				<div
					className={classes.Image}
					style={{
						backgroundImage: `url(${background.url})`,
						backgroundPosition: `center ${background.offset}`
					}}>
					<div className={classes.Fade} />
				</div>
				<div className={classes.Wrapper}>
					<Header />
					<main className={classes.Main}>
						{this.props.children}
					</main>
					<Footer />
				</div>
			</div>
		);
	}
}

export default Layout;