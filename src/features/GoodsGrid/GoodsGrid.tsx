import { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  type GridPaginationModel,
  useGridApiRef,
} from "@mui/x-data-grid";
import { GridPagination, GridTbar } from "./ui";
import { getProducts, type Product } from "./model/api.ts";
import { GridColumnList } from "./GridColumnList.tsx";
import InstanceModal from "./ui/InstanceModal.tsx";
import { Alert } from "@mui/material";

declare module "@mui/x-data-grid" {
  interface GridToolbarProps {
    onSearchChange?: (term: string) => void;
    onAddClick?: () => void;
    onRefreshClick?: () => void;
  }
}

export default function GoodsGrid() {
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const skip = paginationModel.page * paginationModel.pageSize;
      const sortModel = apiRef.current?.getSortModel()?.[0];

      const data = await getProducts(
        skip,
        searchValue,
        sortModel?.field,
        sortModel?.sort,
      );

      if (data) {
        setRows(data.goods);
        setTotalRows(data.total);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [paginationModel.page, paginationModel.pageSize, searchValue, apiRef]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const handleSaveProduct = () => {
    setOpenModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={GridColumnList({ onAddClick: () => setOpenModal(true) })}
        loading={loading}
        checkboxSelection
        slots={{ toolbar: GridTbar, pagination: GridPagination }}
        slotProps={{
          toolbar: {
            onSearchChange: handleSearchChange,
            onAddClick: () => setOpenModal(true),
            onRefreshClick: () => loadProducts(),
          },
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
        sortingMode="server"
        onSortModelChange={(model) => {
          if (model) {
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
            loadProducts();
          }
        }}
        sx={{
          backgroundColor: "#F3F3F3",
          height: "100%",
          "& .MuiDataGrid-main": { backgroundColor: "white" },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "white",
            position: "relative",
            bottom: 0,
            zIndex: 1,
          },
        }}
      />
      <InstanceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveProduct}
      />
      {showAlert && (
        <Alert
          severity="success"
          onClose={() => setShowAlert(false)}
          sx={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
        >
          Товар успешно добавлен!
        </Alert>
      )}
    </>
  );
}
