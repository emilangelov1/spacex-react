import { AppBar, Container, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { Children } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div>
      <AppBar position="sticky">
        <Box padding="15px">
          <Typography variant="h4">
            <Button
              onClick={() => {
                router.push("/");
              }}
              color="inherit"
              size="large"
            >
              SpaceX
            </Button>
          </Typography>
        </Box>
      </AppBar>
      <Box margin="30px" />
      <Container>{children}</Container>
    </div>
  );
}
