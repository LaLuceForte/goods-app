import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import type { GridToolbarProps } from "@mui/x-data-grid/internals";

import { useState } from "react";

import GridHeader from "./GridHeader";

type GridTbarProps = GridToolbarProps & {
  onSearchChange?: (term: string) => void;
};

export function GridTbar(props: GridTbarProps): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    props.onSearchChange?.(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    props.onSearchChange?.("");
  };

  return (
    <div>
      <div className="mt-5 h-26.25 flex items-center  bg-white mb-7.5">
        <div className="text-[20px] pl-7.5 font-bold ">Товары</div>
        <div className="flex flex-1 justify-center">
          <TextField
            onChange={handleChange}
            value={searchValue}
            sx={{
              width: "55vw",
              backgroundColor: "#F3F3F3",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderWidth: 0 },
              },
            }}
            placeholder="Найти"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searchValue ? (
                  <InputAdornment position="end">
                    <CancelIcon
                      fontSize="small"
                      onClick={handleClear}
                      sx={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </div>
      </div>
      <GridHeader />
    </div>
  );
}
