import axios from '../../axios/Config';


export default class ServiceComments {


    async createComment(item) {
        await axios.post("/api/comments/", item).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }
    async createCommentTicket(item) {
        await axios.post("/api/commentsticket/", item).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }

    async deleteComment(id) {
        await axios.delete("/api/comments/" + id).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }
    async deleteCommentTicket(id) {
        await axios.delete("/api/commentsticket/" + id).then(res => { this.Props = { resServer: 1 }; }).catch(err => { this.Props = { resServer: 2 } });
        return this.Props.resServer;
    }

}