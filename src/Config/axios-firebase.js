import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://react-blog-e6cb5-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
