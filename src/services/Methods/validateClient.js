import axios from '../../axios/Config';
import { useAuthClient } from '../../views/PrivateRoutes/contexts/contextRoutes';

function ValidateClient(n, data, param) {

    const { setAuthTokensClients } = useAuthClient();
    let params = {};
    params["id"] = param;
    params["page"] = 0;
    params["size"] = data;
    axios.get("/api/client/" + param, { headers: { 'authorization': param }, params }).then(res => {
        localStorage.setItem("tokenClient", param);
        localStorage.setItem("ClientId", res.data.id);
        localStorage.setItem("Title", "Helper")
        localStorage.setItem("istokenClient", true);
        setAuthTokensClients(true);
    }).catch(err => { console.log(err) });
}


export default ValidateClient;