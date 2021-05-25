import axios from 'axios';

const instance = axios.create({
	baseURL: 'firebase'
});

export default instance;
