import React from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { homeFor } from "../roles";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "student@example.com", password: "Student@123" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      setUser(data);
      navigate(homeFor(data.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 6 }}>
      <Paper sx={{ p: 5, borderRadius: 5, background: "linear-gradient(160deg,#ffffff,#f2efff)", boxShadow: "0 20px 65px #6353b533" }}>
        <Typography variant="h4" gutterBottom>Welcome to Recitation ✨</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue learning.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={submit}>
          <TextField fullWidth label="Email" name="email" margin="normal"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button fullWidth variant="contained" type="submit" size="large" sx={{ mt: 2 }}>Login</Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          New learner? <Link to="/register">Create account</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
