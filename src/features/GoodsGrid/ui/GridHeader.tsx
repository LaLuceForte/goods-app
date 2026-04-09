import { Button, IconButton } from "@mui/material";
import {
  AddCircleOutline,
  CachedOutlined,
  FilterListOutlined,
} from "@mui/icons-material";

export default function GridHeader() {
  return (
    <div className="bg-white p-7.5 pb-10 flex text-[20px] items-center justify-between">
      <span className="font-bold">Все позиции</span>
      <div className="flex gap-2">
        <IconButton className="border border-gray-300 rounded-lg">
          <CachedOutlined className="w-8 h-8 text-gray-500" />
        </IconButton>
        <IconButton className="border border-gray-300 rounded-lg">
          <FilterListOutlined className="w-8 h-8 text-gray-500" />
        </IconButton>
        <Button variant="contained" sx={{ textTransform: "none" }}>
          <AddCircleOutline className="w-8 h-8 text-white" />
          <span className="text-[14px] text-white ml-1">Добавить</span>
        </Button>
      </div>
    </div>
  );
}
