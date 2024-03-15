import { Button, IconButton, Slide, Snackbar } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useEffect, useState } from "react";
interface Props {
  open: boolean;
  close: () => void;
  message: string;
  undo?: () => void;
}
export default function SimpleSnackBar({ open, close, message, undo }: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [close]);

  return (
    <Snackbar
      sx={{ mt: 10 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={5000}
      TransitionComponent={Slide}
      open={open}
      action={
        <>
          {undo && (
            <Button
              color={"secondary"}
              onClick={() => {
                undo();
                close();
              }}
            >
              Undo
            </Button>
          )}
          <IconButton onClick={close}>
            <CloseOutlinedIcon color={"secondary"} />
          </IconButton>
        </>
      }
      message={message}
    />
  );
}
