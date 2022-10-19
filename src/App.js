import logo from './logo.svg';
import './App.css';
import Singnup from './Components/Signup'
import Login from './Components/Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Singnup}></Route>
      {/* <Singnup /> */}
    </BrowserRouter>

  );
}

export default App;
