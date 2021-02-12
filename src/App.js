import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContextClient, AuthContextAdmin, AuthContextLogin } from './views/PrivateRoutes/contexts/contextRoutes';
import { useState } from 'react';
// Components
import Home from './views/Home/home';
import FaqView from './views/Faq/faqView';
import LoginClient from './views/LoginClient/loginClient';
import LoginEmployed from './views/LoginEmployes/loginEmployes';
import admin from './views/Admin/admin';
//Routes private
import PrivateRoute from './views/PrivateRoutes/privateHelper/privateHelper';
import PrivateAdmin from './views/PrivateRoutes/privateadmin/privateAdmin'
import PrivateLogin from './views/PrivateRoutes/privateLogin/privateLogin';

function App() {

  const ClientsToken = (localStorage.getItem("istokenClient"));
  const [authTokensClients, setAuthTokensClients] = useState(ClientsToken);
  const setTokensClients = (data) => {
    localStorage.setItem("istokenClient", (data));
    setAuthTokensClients(data);
  }

  const EmployesToken = (localStorage.getItem("istokenEmployes"));
  const [authTokensEmployes, setAuthTokensEmployes] = useState(EmployesToken);
  const setTokensEmployes = (data) => {
    localStorage.setItem("istokenEmployes", (data));
    setAuthTokensEmployes(data);
  }
  const Loginstate = (localStorage.getItem("isLogin"));
  const [isLogin, setAuthLogin] = useState(Loginstate);
  const setLoginState = (data) => {
    localStorage.setItem("isLogin", (data));
    setAuthLogin(data);

  }
  return (
    <BrowserRouter>
      <AuthContextClient.Provider value={{ authTokensClients, setAuthTokensClients: setTokensClients }}>
        <AuthContextAdmin.Provider value={{ authTokensEmployes, setAuthTokensEmployes: setTokensEmployes }}>
          <AuthContextLogin.Provider value={{ isLogin, setAuthLogin: setLoginState }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/log/helper/:id" component={LoginClient}>
              </Route>
              <PrivateRoute exact path="/helper" component={FaqView} />
              <PrivateAdmin path="/admin" component={admin} />
              <PrivateLogin path="/login" component={LoginEmployed} />
            </Switch>
          </AuthContextLogin.Provider>
        </AuthContextAdmin.Provider>
      </AuthContextClient.Provider>
    </BrowserRouter>
  )
}

export default App;
