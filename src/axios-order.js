import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://my-burger-app-2c901.firebaseio.com/'
});

export default instance;
