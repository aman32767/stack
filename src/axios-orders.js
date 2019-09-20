import axios from 'axios';

const instance =axios.create({
    baseURL:'https://burger-builder-2099.firebaseio.com/'
})

export default instance;