import { Pagination } from "@mui/material";
import {
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

export function GridPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const totalRows = useGridSelector(apiRef, gridRowCountSelector);

  const startRow: number = page * pageSize + 1;
  const endRow: number = Math.min((page + 1) * pageSize, totalRows);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 py-3 px-4 flex justify-between items-center w-full">
      <div className="text-sm text-gray-600">
        Показано {startRow}-{endRow} из {totalRows}
      </div>

      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "8px",
            minWidth: "36px",
            height: "36px",
          },
          "& .Mui-selected": {
            backgroundColor: "#242EDB",
            color: "white",
            "&:hover": {
              backgroundColor: "#1a23b5",
            },
          },
        }}
      />
    </div>
  );
}
