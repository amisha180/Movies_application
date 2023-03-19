import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Popular from "./Pages/Popular/Popular";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";
import Details from "./Pages/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Popular} exact />
            <Route path="/search" component={Search} />
            <Route path="/:id" component={Details}/>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
