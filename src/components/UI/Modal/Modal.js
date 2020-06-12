import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import DropBox from '../DropBox/DropBox';
class Modal extends Component {
	//Performance Improvement
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}
	render() {
		return (
			<Aux>
				<DropBox show={this.props.show} close={this.props.clicked} />
				<div
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
					className={classes.Modal}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}

export default Modal;
