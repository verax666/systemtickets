import axios from '../../../axios/Config';

function statusCatalog() {
    let catalog = [];

    axios.get("/api/statuscatalog/").then(res => {
        res.data.map((item, index) => { catalog.push(item) })
    }).catch(err => { console.log(err) });
    return catalog;
}


export default statusCatalog;