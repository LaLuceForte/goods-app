import { Button, Checkbox, FormControlLabel } from "@mui/material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "./model/api";
import { LoginField, PasswordField } from "./ui";

export default function AuthForm(): React.ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const loginRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    const success = await loginUser(username, password, remember);
    if (success) {
      setError("");
      navigate("/");
    } else {
      setError("Неверные логин или пароль!");
    }
  };

  return (
    <form className="contents">
      <div>Логин</div>
      <LoginField
        value={username}
        onChange={setUsername}
        onErrorClear={() => setError("")}
        inputRef={loginRef}
      />
      <div className="mt-[10px]">Пароль</div>
      <PasswordField
        value={password}
        onChange={setPassword}
        onErrorClear={() => setError("")}
      />
      {error && <div className="text-red-600 text-center">{error}</div>}
      <FormControlLabel
        label="Запомнить данные"
        control={<Checkbox onChange={(e) => setRemember(e.target.checked)} />}
      />
      <Button
        sx={{
          backgroundColor: "#242EDB",
          height: 54,
          textTransform: "none",
        }}
        variant="contained"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Войти
      </Button>
    </form>
  );
}
