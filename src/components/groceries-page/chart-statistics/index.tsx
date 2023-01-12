import { Pie } from "react-chartjs-2";

import { ArcElement, Chart, SubTitle, Title, Tooltip, Legend } from "chart.js";
import { NGroceries } from "@namespace/groceries-page";

export const Statistics = ({ data }: NGroceries.TStatisticsProps) => {
  Chart.register(SubTitle, Title, Tooltip, ArcElement, Legend);
  return (
    <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
      <h2 style={{ textAlign: "center" }}>Chart shopping</h2>
      <Pie
        {...{
          data,
          height: 300,
          width: 300,
        }}
      />
    </div>
  );
};
