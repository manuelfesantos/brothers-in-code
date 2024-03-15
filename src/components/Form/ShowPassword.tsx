import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function ShowPassword({ show, setShow }: Props) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShow(!show)}
        onMouseDown={(event) => event.preventDefault()}
        edge="end"
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
