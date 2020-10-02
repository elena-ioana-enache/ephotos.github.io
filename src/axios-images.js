import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://image-uploader-db.firebaseio.com/'
});

export default instance;