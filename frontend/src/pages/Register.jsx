import React from "react";
import { homeFor } from "../roles";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      setUser(data);
      navigate(homeFor(data.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 430, mx: "auto", mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Create Account</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit}>
          <TextField fullWidth required label="Name" name="name" margin="normal" value={form.name} onChange={change} />
          <TextField fullWidth required label="Email" name="email" margin="normal" value={form.email} onChange={change} />
          <TextField fullWidth required label="Password" name="password" type="password" margin="normal" value={form.password} onChange={change} />
          <Button fullWidth variant="contained" type="submit" size="large" sx={{ mt: 2 }}>Register</Button>
        </Box>
        <Typography sx={{ mt: 2 }}>Already registered? <Link to="/login">Login</Link></Typography>
      </Paper>
    </Box>
  );
}
