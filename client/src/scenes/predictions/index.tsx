import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, useTheme, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

const Prediction = () => {
  const { palette } = useTheme();
  const { data: kpis } = useGetKpisQuery();
  const formattedData = useMemo(() => {
    if (!kpis) return [];
    const formatted: Array<DataPoint> = kpis[0].monthlyData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);

    return kpis[0].monthlyData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpis]);

  return (
    <DashboardBox width="100%" height="100%">
      <FlexBetween>
        <Box
          width="100%"
          height="100%"
          sx={{
            marginTop: "1.2rem",
            marginLeft: "1.2rem",
          }}
        >
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            Chart Revenua and Predicted Revenue base on Machine Learning Linear
            Regression Model
          </Typography>
        </Box>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="4 1" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 30000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Revenue in USD"
              offset={-5}
              position="insideLeft"
              angle={-90}
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            strokeWidth={0}
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.grey[300]}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Predicted Revenue"
            stroke={palette.secondary.light}
            dot={false}
            strokeDasharray="4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Prediction;
