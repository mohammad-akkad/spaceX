import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import CharactersList from "./components/characters-list.component";
import EpisodesList from "./components/episodes-list.component";
import EpisodeDetail from "./components/episode-detail/episode-detail.component";
import CharacterDetail from "./components/character-detail/character-detail.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/episodes" className="navbar-brand">
            Episodes
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/characters"} className="nav-link">
                Characters
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/episodes", "/episodes/page/:page"]}
              component={EpisodesList}
            />
            <Route exact path="/episode/:id" component={EpisodeDetail} />
            <Route
              exact
              path={["/characters", "/characters/page/:page"]}
              component={CharactersList}
            />
            <Route exact path="/character/:id" component={CharacterDetail} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
