import Axios from 'axios';

export default class MethodsTickets {

    Props = {
        resServer: false,
        tickets: null,
        ticket: null
    };

    async postTicket(item) {
        await Axios.post("https://pure-atoll-22967.herokuapp.com//api/ticket/", item).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }

    async getTickets(n, data, idclient) {
        let params = {};
        params["id_client"] = idclient;
        params["page"] = n - 1;
        params["size"] = data;
        await Axios.get("https://pure-atoll-22967.herokuapp.com/api/ticket/", { headers: { 'authorization': idclient }, params }).then(res => {
            this.Props = { tickets: res.data };

        }).catch(err => console.log("err"));
        return this.Props.tickets;
    }
    async getAllTickets(n, data) {
        let params = {};
        params["page"] = n - 1;
        params["size"] = data;
        await Axios.get("https://pure-atoll-22967.herokuapp.com/api/ticket/get/", { params }).then(res => {
            this.Props = { tickets: res.data }
        }).catch(err => console.log("err"));
        return this.Props.tickets;
    }


    async getTikcet(i) {
        await Axios.get("https://pure-atoll-22967.herokuapp.com/api/ticket/" + i).then(res => { this.Props = { ticket: res.data }; })
        return this.Props;
    }



}

