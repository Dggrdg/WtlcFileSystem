import axios from 'axios';

export default class LoginService {

    public login() {
        return axios.post('http:localhost:8080/login')
    }

}