import { AddCircleOutline, MoreHorizOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";

export const GridColumnList = ({
  onAddClick,
}: {
  onAddClick: () => void;
}): GridColDef[] => [
  {
    headerName: "Наименование",
    flex: 1,
    field: "title",
    renderCell: function (params) {
      return (
        <div className="flex flex-col leading-6 ">
          <span className="font-medium">{params?.value || ""}</span>
          <span className="text-gray-500 text-xs ">
            {params?.row?.category || ""}
          </span>
        </div>
      );
    },
  },
  {
    headerName: "Вендор",
    flex: 1,
    field: "brand",
    cellClassName: "font-semibold",
  },
  {
    headerName: "Артикул",
    flex: 1,
    field: "sku",
  },
  {
    headerName: "Оценка",
    flex: 1,
    field: "rating",
    renderCell: function (params) {
      return (
        <div>
          <span className={params.value < 3.5 ? "text-red-600" : "text-black"}>
            {params.value.toFixed(1)}
          </span>
          /5
        </div>
      );
    },
  },
  {
    headerName: "Цена",
    field: "price",
    flex: 1,
  },
  {
    field: "addAction",
    headerName: "",
    flex: 1,
    filterable: false,
    sortable: false,
    renderCell: () => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddClick();
      };

      return (
        <IconButton onClick={onClick} size="small" color="primary">
          <AddCircleOutline />
        </IconButton>
      );
    },
  },
  {
    field: "more",
    headerName: "",
    filterable: false,
    sortable: false,
    flex: 1,
    renderCell: () => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
      };
      return (
        <IconButton onClick={onClick} size="small" color="primary">
          <MoreHorizOutlined />
        </IconButton>
      );
    },
  },
];
