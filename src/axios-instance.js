import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cadabra-note-app.herokuapp.com/api/v1/'
});

export default instance;