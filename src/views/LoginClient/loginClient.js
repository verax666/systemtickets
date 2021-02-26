import { useState } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import validateClient from '../../services/validateClient'

function LoginClient(props) {
    const { match: { params } } = props;
    const [islogin, setlogin] = useState(false);
    function checklogin() {
        validateClient(0, 5, params.id);

    }
    useEffect(() => {
        setlogin(localStorage.getItem("istokenClient"))
    }, [localStorage.getItem("istokenClient")])

    return (
        <div>
            {islogin ?
                <Redirect to="/helper" > </Redirect> : <div> {checklogin()} </div>
            }

        </div>
    );

}

export default LoginClient;