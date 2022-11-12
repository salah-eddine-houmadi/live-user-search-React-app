import axios from "axios";


export class UserService{
    static getALLUsers(){
        return axios.get('https://randomuser.me/api?results=50');
    }
}