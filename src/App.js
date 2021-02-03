import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/navBar';
import FaqView from './views/Faq/faqView';
import PrivateRoute from './views/privateRoute/privateRoute';
import { AuthContext, AuthContextAdmin } from './views/privateRoute/auth/auth';
import { useState } from 'react';
import Home from './views/Home/home';
import LoginClient from './views/LoginClient/loginClient';
import PrivateAdmin from './views/privateadmin/privateAdmin'
import admin from './views/Admin/admin';
import { LoginEmplyed } from './views/LoginEmployes/loginEmployes';
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
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authTokensClients, setAuthTokensClients: setTokensClients }}>
        <AuthContextAdmin.Provider value={{ authTokensEmployes, setAuthTokensEmployes: setTokensEmployes }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/helper/:id" component={LoginClient}>
            </Route>
            <PrivateRoute path="/helper" component={FaqView} />
            <PrivateAdmin path="/admin" component={admin} />
            <Route path="/login" component={LoginEmplyed} />
          </Switch>
        </AuthContextAdmin.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
