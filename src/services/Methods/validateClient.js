import axios from '../../Axios/Config';
import { useAuth } from '../../views/privateRoute/auth/auth';

function ValidateClient(n, data, param) {

    const { setAuthTokensClients } = useAuth();
    let params = {};
    params["token"] = param;
    params["page"] = 0;
    params["size"] = data;
    axios.get("/api/client/" + param, { params }).then(res => {
        localStorage.setItem("tokenClient", param);
        localStorage.setItem("ClientId", res.data.id);
        localStorage.setItem("Title", "Helper")
        localStorage.setItem("istokenClient", true);
        setAuthTokensClients(true);
    }).catch(err => { console.log(err) });
    return localStorage.getItem("istokenClient");
}


export default ValidateClient;