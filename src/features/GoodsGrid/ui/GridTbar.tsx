import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import GridHeader from "./GridHeader";

type GridTbarProps = {
  onSearchChange?: (term: string) => void;
  onAddClick?: () => void;
  onRefreshClick?: () => void;
};

export function GridTbar(props: GridTbarProps): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    props.onSearchChange?.(value);
  };

  const handleClear = () => {
    setSearchValue("");
    props.onSearchChange?.("");
  };

  return (
    <div>
      <div className="mt-5 h-26.25 flex items-center bg-white mb-7.5">
        <div className="text-[20px] pl-7.5 font-bold">Товары</div>
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
      <GridHeader
        onAddClick={props.onAddClick}
        onRefreshClick={props.onRefreshClick}
      />
    </div>
  );
}
