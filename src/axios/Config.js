import axios from 'axios';



const local = "http://localhost:8080";
// const heroku = "https://pure-atoll-22967.herokuapp.com"
const prod = "https://tickets.adn-apps.com";
export default axios.create({
    baseURL: prod
})