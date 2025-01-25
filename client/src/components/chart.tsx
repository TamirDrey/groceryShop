import React from "react";
import { Chart } from "react-google-charts";
import { Report } from "../types/report";

interface ChartProps {
  reports: Report[];
}

const ChartComponent: React.FC<ChartProps> = ({ reports }) => {
  const data = [
    ["Date", "Income", "Outcome", "Revenue"],
    ...reports.map((report) => [
      new Date(report.date).toLocaleDateString(),
      report.income,
      report.outcome,
      report.clearRevenue,
    ]),
  ];

  const options = {
    title: "Grocery Shop Performance",
    subtitle: "Income, Outcome, and Revenue by Date",
    vAxis: { title: "Amount (in USD)"}, 
    hAxis: { title: "Date" },
    bars: "horizontal",
    height: 400,
    colors: ["#7570b3", "#d95f02", "#1b9e77"],
    isStacked: false,
  };

  return (
    <div className="flex justify-center items-center">
      {data.length > 1 ? (
        <Chart
          chartType="ColumnChart" // Use Material Design Bar Chart
          width="100%"
          height="100%"
          data={data}
          options={options}
        />
      ) : (
        <div className="text-center">
          No data available for the selected range.
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
