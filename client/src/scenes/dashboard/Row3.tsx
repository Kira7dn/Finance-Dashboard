import DashboardBox from "@/components/DashboardBox";
import { useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import { DataGrid } from "@mui/x-data-grid";
import { GridCellParams } from "@mui/x-data-grid/models";
const Row3 = () => {
  const { palette } = useTheme();
  const { data: products } = useGetProductsQuery();
  const { data: transactions } = useGetTransactionsQuery();
  const transactionsCol = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.5,
      // renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.25,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.25,
      renderCell: (params: GridCellParams) =>
        `${(params.value as Array<string>).length}`,
    },
  ];
  const productCol = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="List of Products"
          sideText={`${products?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columns={productCol}
            rows={products || []}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Transactions"
          sideText={`${transactions?.length} sales`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columns={transactionsCol}
            rows={transactions || []}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
