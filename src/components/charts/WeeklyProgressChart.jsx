import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "../../ui/chart";

const WeeklyProgressChart = ({ data }) => {
  console.log("Weekly chart data:", data);

  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: "rgb(79 70 229)", // green-500
        },
        missed: {
          label: "incompleted",
          color: "rgb(71 85 105)", // red-500
        },
      }}
      className="md:h-120 sm:h-25"
    >
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />

      {/* completed  */}
        <Bar
          dataKey="completed"
          stackId="a"
          radius={[12, 12, 12, 12]}
          fill="var(--color-completed)"
        />
      {/* incompl;eted */}
        <Bar
          dataKey="incompleted"
          stackId="a"
          radius={[12, 12, 12, 12]}
          fill="var(--color-missed)"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default WeeklyProgressChart;
