import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import {
  AddCircleOutline,
  CachedOutlined,
  FilterListOutlined,
  Check,
} from "@mui/icons-material";
import { useState } from "react";
import {
  gridSortModelSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const sortOptions = [
  { label: "Цена ↑", field: "price", direction: "asc" as const },
  { label: "Цена ↓", field: "price", direction: "desc" as const },
  { label: "Рейтинг ↑", field: "rating", direction: "asc" as const },
  { label: "Рейтинг ↓", field: "rating", direction: "desc" as const },
];

interface GridHeaderProps {
  onAddClick?: () => void;
  onRefreshClick?: () => void;
}

export default function GridHeader(props: GridHeaderProps) {
  const apiRef = useGridApiContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const sortModel = useGridSelector(apiRef, gridSortModelSelector);
  const currentSort = sortModel[0];

  const open = Boolean(anchorEl);
  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };

  const handleSortIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (field: string, direction: "asc" | "desc") => {
    if (currentSort?.field === field && currentSort?.sort === direction) {
      apiRef.current?.sortColumn(field, null);
    } else {
      apiRef.current?.sortColumn(field, direction);
    }
    handleCloseSortMenu();
  };

  const isActive = (field: string, direction: "asc" | "desc") => {
    return currentSort?.field === field && currentSort?.sort === direction;
  };

  return (
    <div className="bg-white p-7.5 pb-10 flex text-[20px] items-center justify-between">
      <span className="font-bold">Все позиции</span>
      <div className="flex gap-2">
        <IconButton
          className="border border-gray-300 rounded-lg"
          onClick={props.onRefreshClick}
        >
          <CachedOutlined className="w-8 h-8 text-gray-500" />
        </IconButton>
        <IconButton
          className="border border-gray-300 rounded-lg"
          onClick={handleSortIconClick}
        >
          <FilterListOutlined className="w-8 h-8 text-gray-500" />
        </IconButton>
        <Menu open={open} onClose={handleCloseSortMenu} anchorEl={anchorEl}>
          {sortOptions.map(({ label, field, direction }) => (
            <MenuItem
              key={`${field}-${direction}`}
              onClick={() => handleSort(field, direction)}
            >
              {isActive(field, direction) && (
                <Check fontSize="small" sx={{ mr: 1 }} />
              )}
              {label}
            </MenuItem>
          ))}
        </Menu>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={props.onAddClick}
        >
          <AddCircleOutline className="w-8 h-8 text-white" />
          <span className="text-[14px] text-white ml-1">Добавить</span>
        </Button>
      </div>
    </div>
  );
}
