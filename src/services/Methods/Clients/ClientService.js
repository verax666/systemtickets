import axios from '../../../axios/Config';

export default class CGetClients {

    Props = {
        clients: null
    };
    async getClients() {
        await axios.get("/api/client/").then(res => {
            this.Props = { clients: res.data }
            console.log(res.data)
        }).catch(err => console.log("err"));
        return this.Props.clients;
    }

}