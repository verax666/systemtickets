import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import FaqView from './views/Faq/faqView';
import PrivateRoute from './views/privateRoute/privateRoute';
import { AuthContext, AuthContextAdmin, AuthContextLogin } from './views/privateRoute/auth/auth';
import { useState } from 'react';
import Home from './views/Home/home';
import LoginClient from './views/LoginClient/loginClient';
import PrivateAdmin from './views/privateadmin/privateAdmin'
import admin from './views/Admin/admin';
import LoginEmployed from './views/LoginEmployes/loginEmployes';
import PrivateLogin from './views/privateLogin/privateLogin';

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
      <AuthContext.Provider value={{ authTokensClients, setAuthTokensClients: setTokensClients }}>
        <AuthContextAdmin.Provider value={{ authTokensEmployes, setAuthTokensEmployes: setTokensEmployes }}>
          <AuthContextLogin.Provider value={{ isLogin, setAuthLogin: setLoginState }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/log/helper/:id" component={LoginClient}>
              </Route>
              <PrivateRoute path="/helper" component={FaqView} />
              <PrivateAdmin path="/admin" component={admin} />
              <PrivateLogin path="/login" component={LoginEmployed} />
            </Switch>
          </AuthContextLogin.Provider>
        </AuthContextAdmin.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
