import axios from '../../axios/Config';

export default class MethodsTickets {

    Props = {
        resServer: false,
        tickets: null,
        ticket: null,
        status: null
    };

    async postTicket(item) {
        await axios.post("/api/ticket/", item).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }

    async getTickets(n, data, idclient) {
        let params = {};
        params["id_client"] = idclient;
        params["page"] = n - 1;
        params["size"] = data;
        await axios.get("/api/ticket/", { headers: { 'authorization': idclient }, params }).then(res => {
            this.Props = { tickets: res.data };
        }).catch(err => console.log("err"));
        return this.Props.tickets;
    }

    async getAllTickets(n, data) {
        let params = {};
        params["page"] = n - 1;
        params["size"] = data;
        await axios.get("/api/ticket/get/", { params }).then(res => {
            this.Props = { tickets: res.data }
        }).catch(err => console.log("err"));
        return this.Props.tickets;
    }

    async getTikcet(i) {
        await axios.get("/api/ticket/" + i).then(res => { this.Props = { ticket: res.data }; })
        return this.Props;
    }

    async updateTicket(id, status, comments) {
        await axios.put("/api/ticket/" + id, { statusCatalogId: status, comments: comments }).then(res => { this.Props = { ticket: res.data }; })

    }

}

