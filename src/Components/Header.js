import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(authActions.logout());
    navigate("/login", { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to your Mail Box
          </Typography>
          {isLoggedIn && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogOut}
            >
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
