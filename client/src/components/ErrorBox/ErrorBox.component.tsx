import { Box, useTheme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface ErrorBoxProps extends PropsWithChildren<any> {
  error?: boolean;
  message?: string;
}

export default function ErrorBox({ error, message, children }: ErrorBoxProps) {
  const theme = useTheme();
  const color = error ? theme.palette.error.main : theme.palette.primary.main;
  return (
    <Box
      component="span"
      sx={{ p: 2, border: `1px solid ${color}`, borderRadius: "10px" }}
    >
      {message && (
        <Typography variant="body2" color={error ? "error" : "textPrimary"} className={"msg-wrapper"}>
          {message}
        </Typography>
      )}
      {children}
    </Box>
  );
}
