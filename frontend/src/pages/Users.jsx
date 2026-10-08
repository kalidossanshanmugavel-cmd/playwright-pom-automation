import React from "react";
import { useEffect, useState } from "react";
import { Alert, Box, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import api from "../api";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/admin/users").then(r => setUsers(r.data)).catch(e => setError(e.response?.data?.detail || "Unable to load users")); }, []);
  return <Box><Typography variant="h4" fontWeight={800} mb={3}>User Management</Typography>
    {error && <Alert severity="error">{error}</Alert>}
    <Paper sx={{ borderRadius: 4, overflow: 'hidden' }}><Table><TableHead><TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell></TableRow></TableHead><TableBody>{users.map(u => <TableRow key={u.id}><TableCell>{u.name}</TableCell><TableCell>{u.email}</TableCell><TableCell><Chip color={u.role === 'admin' ? 'secondary' : u.role === 'trainer' ? 'info' : 'success'} label={u.role} /></TableCell></TableRow>)}</TableBody></Table></Paper>
  </Box>;
}
