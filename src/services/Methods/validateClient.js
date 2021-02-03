import Axios from 'axios';
import { useAuth } from '../../views/privateRoute/auth/auth';

const ValidateClient = async (n, data, param) => {

    const { setAuthTokensClients } = useAuth();
    let params = {};
    params["id_client"] = param;
    params["page"] = 0;
    params["size"] = data;
    await Axios.get("https://pure-atoll-22967.herokuapp.com/api/ticket/", { headers: { 'authorization': param }, params }).then(res => {
        localStorage.setItem("tokenClient", param);
        localStorage.setItem("ClientId", res.data.tickets[0].clientId);
        localStorage.setItem("Title", "Helper")
        setAuthTokensClients(true);
    }).catch(err => { console.log(err) });
    return localStorage.getItem("istokenClient");
}


export default ValidateClient;