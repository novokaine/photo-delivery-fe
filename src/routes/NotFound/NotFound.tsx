import { Container, Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      component={"main"}
      maxWidth={"md"}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center"
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 3, width: "100%" }}
        className="paper-form"
      >
        <Typography align="center" variant="h1">
          404 - Not found :(
        </Typography>
      </Paper>
    </Container>
  );
};

export default NotFound;
