import { useMemo } from "react";
import { useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Line,
  ScatterChart,
  Scatter,
} from "recharts";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";

const Row2 = () => {
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const expense = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, nonOperationalExpenses, operationalExpenses }) => {
          return {
            name: month.substring(-3, 3),
            nonOpExpenses: nonOperationalExpenses,
            opExpenses: operationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);
  const priceVsExpense = useMemo(() => {
    return (
      productData &&
      productData.map(({ expense, price }) => {
        return {
          expense,
          price,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={expense}
            margin={{
              top: 15,
              right: -10,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis
              yAxisId={0}
              type="number"
              dataKey="opExpenses"
              orientation="left"
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={1}
              type="number"
              dataKey="nonOpExpenses"
              orientation="right"
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId={0}
              type="monotone"
              dataKey="opExpenses"
              stroke={palette.primary.main}
              activeDot={{ r: 5 }}
            />
            <Line
              yAxisId={1}
              type="monotone"
              dataKey="nonOpExpenses"
              stroke={palette.tertiary[500]}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Product Price vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            width={500}
            height={300}
            margin={{
              top: 20,
              right: 25,
              left: -10,
              bottom: 40,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="expense"
              unit="$"
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="price"
              unit="$"
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name="Product Expense Ratio"
              data={priceVsExpense}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
