import logo from './logo.svg';
import './App.css';
import Singnup from './Components/Signup'
import Login from './Components/Login'
import Feed from './Components/Feed';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Singnup}/>
          <PrivateRoute path="/" component={Feed}/>
        </Switch>
      </AuthProvider>

      {/* <Singnup /> */}
    </BrowserRouter>

  );
}

export default App;
