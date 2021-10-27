import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Statistics from "./components/statisticst.component";
import LaunchesList from "./components/launches-list.component";
import LaunchDetail from "./components/launch-detail/launch-detail.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundImage: "url(/Space_night_sky.jpg)" }}
    >
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/launches" className="navbar-brand">
            Launches
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/statistics"} className="nav-link">
                Statistics
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Launches"]} component={LaunchesList} />
            <Route exact path="/launch/:id" component={LaunchDetail} />
            <Route exact path={["/statistics"]} component={Statistics} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
