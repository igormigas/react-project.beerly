import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Main CSS source
//import './styles/bootstrap/bootstrap-grid.css';
import './styles/global.scss';

// React Components
import Layout from './containers/Layout';
import List from './containers/List/List';
import TestComponent from './containers/TestComponent';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route path="/test" component={TestComponent} />
						<Route path="/details-:id"  component={List} />
						<Route path="/" component={List} />
					</Switch>
				</Layout>
			</Router>
		);
	}
}

export default App;