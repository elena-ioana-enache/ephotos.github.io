import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.flickr.com/services/rest',
    params: {
        method: 'flickr.photos.search',
        api_key: '15b67c2a8b4288ff1fddf5eb56655cfb',
        extras: 'url_n, owner_name, date_taken, views, tags',
        format: 'json',
        nojsoncallback: 1,
        per_page: 20,
    }
});
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;

//i downgraded axios to version "axios": "0.18.1" because version "0.19.1" was not merging the params from config and the ones from call