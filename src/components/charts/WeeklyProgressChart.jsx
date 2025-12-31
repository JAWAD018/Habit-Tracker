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
  const hasActivity = data.some(
    d => d.completed > 0 || d.incompleted > 0
  );

  // ✅ EMPTY STATE (RESPONSIVE)
  if (!hasActivity) {
    return (
      <div className="
        h-40 sm:h-48 lg:h-64
        flex flex-col items-center justify-center
      ">
        {/* Placeholder bars */}
        <div className="flex items-end gap-3 mb-5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="
                w-6 sm:w-7 lg:w-9
                h-24 sm:h-32 lg:h-44
                rounded-md
                bg-gray-200 dark:bg-gray-800
                animate-pulse
              "
            />
          ))}
        </div>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center">
          Start checking in to see your weekly progress
        </p>
      </div>
    );
  }

  // ✅ NORMAL CHART (RESPONSIVE)
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: "rgb(99 102 241)", // indigo-500
        },
        missed: {
          label: "Missed",
          color: "rgb(148 163 184)", // slate-400
        },
      }}
      className="
        h-44 sm:h-56 lg:h-72 xl:h-98
      "
    >
      <BarChart
        data={data}
        barGap={10}
        barCategoryGap="20%"
      >
        <CartesianGrid vertical={false} strokeOpacity={0.15} />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />

        {/* ✅ COMPLETED */}
        <Bar
          dataKey="completed"
          stackId="a"
          radius={[8, 8, 0, 0]}
          fill="var(--color-completed)"
        />

        {/* ✅ MISSED */}
        <Bar
          dataKey="incompleted"
          stackId="a"
          radius={[8, 8, 8, 8]}
          fill="var(--color-missed)"
        />
      </BarChart>
    </ChartContainer>
  );
};

export default WeeklyProgressChart;
