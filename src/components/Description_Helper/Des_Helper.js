import Des_helper_css from "./Des_helper_css";

function Des_Helper() {
    const classes = Des_helper_css();

    return (
        <div className={classes.container}>
            <p>Pueden consultar las preguntas frecuentes y levantar tickets...
            </p>
        </div>
    );

}

export default Des_Helper;