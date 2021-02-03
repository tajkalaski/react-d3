import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import MainTemplate from "../templates/MainTemplate";
import { routes } from "./../routes/index";
import SingleLineChart from "./SingleLineChart";
import BarChart from "./BarChart";
import MultipleLineChart from "./MultipleLineChart";

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path={routes.home} component={SingleLineChart} />
        <Route
          exact
          path={routes.singleLineChart}
          component={SingleLineChart}
        />
        <Route exact path={routes.barChart} component={BarChart} />
        <Route path={routes.multipleLineChart} component={MultipleLineChart} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
