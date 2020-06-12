import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
	it('should  return inital state', () => {
		expect(reducer(undefined, {})).toEqual({
			userId: null,
			token: null,
			loading: false,
			error: null,
			authRedirectPath: '/'
		});
	});
	it('should return the success info  ', () => {
		expect(
			reducer(
				{
					userId: null,
					token: null,
					loading: false,
					error: null,
					authRedirectPath: '/'
				},
				{
					type: actionTypes.AUTH_SUCCESS,
					token: 'token-some',
					userId: 'user-id'
				}
			)
		).toEqual({
			userId: 'user-id',
			token: 'token-some',
			loading: false,
			error: null,
			authRedirectPath: '/'
		});
	});
});
