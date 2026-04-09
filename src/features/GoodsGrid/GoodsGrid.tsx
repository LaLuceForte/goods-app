import { useEffect, useState } from "react";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { GridPagination, GridTbar } from "./ui";
import { getProducts, type Product } from "./model/api.ts";
import { GridColumnList } from "./GridColumnList.tsx";

declare module "@mui/x-data-grid" {
  interface GridToolbarProps {
    onSearchChange?: (term: string) => void;
  }
}

export default function GoodsGrid() {
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const skip = paginationModel.page * paginationModel.pageSize;
        const data = await getProducts(skip, searchTerm);

        if (data) {
          setRows(data.goods);
          setTotalRows(data.total);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [paginationModel.page, paginationModel.pageSize, searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  return (
    <DataGrid
      rows={rows}
      columns={GridColumnList}
      loading={loading}
      checkboxSelection
      slots={{ toolbar: GridTbar, pagination: GridPagination }}
      slotProps={{
        toolbar: { onSearchChange: handleSearchChange },
      }}
      showToolbar
      rowCount={totalRows}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[20]}
      disableColumnMenu
      disableColumnSorting
      disableColumnFilter
      sx={{
        backgroundColor: "#F3F3F3",
        height: "100%",

        "& .MuiDataGrid-main": {
          backgroundColor: "white",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "white",
          position: "relative",
          bottom: 0,
          zIndex: 1,
        },
      }}
    />
  );
}
