import React, { JSX } from "react";
import { Container, Grid2 } from "@mui/material";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }): JSX.Element => {
  return (
    <Grid2 container direction="column" sx={{ minHeight: "100vh" }}>
      <Grid2 sx={{ flexGrow: 1 }}>
        <Container sx={{ py: 4 }}>{children}</Container>
      </Grid2>
    </Grid2>
  );
};

export default PageLayout;
