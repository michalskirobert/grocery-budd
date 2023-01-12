import { ChartData } from "chart.js";

export declare namespace NGroceries {
  type S = string;
  type N = number;
  type D = Date;
  type B = boolean;
  type JSX = JSX.Element;

  type TStatisticsProps = {
    data: ChartData<"pie", number[], string>;
  };
}
