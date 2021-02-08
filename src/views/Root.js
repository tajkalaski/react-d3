import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import MainTemplate from "../templates/MainTemplate";
import { routes } from "./../routes/index";
import BarChartView from "./BarChartView";
import LineChartView from "./LineChartView";

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path={routes.home} component={LineChartView} />
        <Route exact path={routes.lineChart} component={LineChartView} />
        <Route exact path={routes.barChart} component={BarChartView} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
