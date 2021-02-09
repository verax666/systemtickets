import axios from 'axios';



const local = "http://localhost:8080";
const heroku = "https://pure-atoll-22967.herokuapp.com"
export default axios.create({
    baseURL: heroku
})