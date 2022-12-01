import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_PATH;
axios.defaults.withCredentials = false;

export default axios;