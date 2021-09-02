import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-buildaburger-4af0b-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;