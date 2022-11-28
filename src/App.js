import Home from './components/Home'
import Login from './components/Login'
import Users from './components/Users'

import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App-header">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
