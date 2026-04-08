import { TextField, InputAdornment, IconButton } from "@mui/material";
import { LockOutline, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  onErrorClear: () => void;
}

export const PasswordField = ({
  value,
  onChange,
  onErrorClear,
}: PasswordFieldProps): React.ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
    onErrorClear();
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      required
      value={value}
      onChange={handleChange}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <LockOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={toggleShowPassword}>
                <VisibilityOff />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
