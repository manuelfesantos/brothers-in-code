import { Alert, IconButton } from "@mui/material";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  error?: boolean;
  handleClose: () => void;
  success: boolean;
}
export default function FormAlert({
  children,
  error,
  success,
  handleClose,
}: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [handleClose]);

  const resolveSeverity = () => {
    if (error) {
      return "error";
    } else if (success) {
      return "success";
    }
  };
  return (
    <Alert
      sx={{
        position: "absolute",
        top: 70,
        width: "100%",
        alignItems: "center",
      }}
      severity={resolveSeverity()}
      action={
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      {children}
    </Alert>
  );
}
