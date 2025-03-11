import { Container } from "@mui/material";
import Header from "../Header";
import { JSX } from "react";

interface LayoutWrapperType {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperType): JSX.Element => (
  <Container>
    <Header />
    {children}
  </Container>
);

export default LayoutWrapper;
