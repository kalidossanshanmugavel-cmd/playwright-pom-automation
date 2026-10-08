import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
            <Button color="inherit" variant="outlined" onClick={logout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
