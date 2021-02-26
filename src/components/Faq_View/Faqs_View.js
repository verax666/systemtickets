import Des_helper_css from "../Description_Helper/Des_helper_css";
import Faqs from "./Faqs/Faqs";


function Faq() {
    const classes = Des_helper_css();

    return (
        <div className={classes.container}>
            <h3>Preguntas Frecuentes</h3>
            <Faqs />
        </div>
    );

}
export default Faq;
