import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentWillMount() {
			this.requestInter = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.responseInter = axios.interceptors.response.use(
				(response) => response,
				(error) => {
					this.setState({ error: error });
				}
			);
		}
		componentWillUnmount() {
			console.log('will Mount [error ]', this.responseInter, this.requestInter);
			axios.interceptors.request.eject(this.requestInter);
			axios.interceptors.response.eject(this.responseInter);
		}

		errorHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<Aux>
					<Modal clicked={this.errorHandler} show={this.state.error}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			);
		}
	};
};

export default withErrorHandler;
