import Aux from '../../hoc/Aux';
import React, { Component } from 'react';
import classes from '../../components/Layout/Layout.module.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import Toolbar from '../UI/Toolbar/Toolbar';
import { connect } from 'react-redux';
class Layout extends Component {
	state = {
		showSideDrawer: false
	};
	closeSideDrawerHandler = () => {
		this.setState({ showSideDrawer: false });
	};
	toggleSideDrawerHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }; //clean way of etting the state
		});
	};
	render() {
		return (
			<Aux>
				<Toolbar isAuth={this.props.isAuthenticated} showHandler={this.toggleSideDrawerHandler} />
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					show={this.state.showSideDrawer}
					closeSide={this.closeSideDrawerHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};
export default connect(mapStateToProps)(Layout);
