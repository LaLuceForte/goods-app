import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Person2Outlined, Clear } from "@mui/icons-material";
import type { RefObject } from "react";

interface LoginFieldProps {
  value: string;
  onChange: (value: string) => void;
  onErrorClear: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export const LoginField = ({
  value,
  onChange,
  onErrorClear,
  inputRef,
}: LoginFieldProps): React.ReactElement => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
    onErrorClear();
  };

  const handleClear = (): void => {
    onChange("");
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <TextField
      required
      value={value}
      onChange={handleChange}
      inputRef={inputRef}
      autoComplete="current-login"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Person2Outlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClear}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
