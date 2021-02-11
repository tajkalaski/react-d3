import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainTemplate from "../templates/MainTemplate";
import { routes } from "./../routes/index";
import BarChartView from "./BarChartView";
import LineChartView from "./LineChartView";

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path={routes.home} component={LineChartView} />
        <Route path={routes.lineChart} component={LineChartView} />
        <Route path={routes.barChart} component={BarChartView} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
