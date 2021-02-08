import axios from 'axios';



const local = "http://localhost:8080";
const vercel = "https://systemtickets.vercel.app"
export default axios.create({
    baseURL: vercel
})