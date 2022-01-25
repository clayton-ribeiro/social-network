import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

function App() {
  const context = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {context?.state.user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{context?.state.user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {context?.state.user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
