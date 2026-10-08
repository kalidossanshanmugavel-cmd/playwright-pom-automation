import React from "react";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import api from "./api";
import { homeFor } from "./roles";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MCQ from "./pages/MCQ";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Register from "./pages/Register";
import Users from "./pages/Users";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    api.get("/auth/me").then(({ data }) => setUser(data)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  const guard = (element, roles) => <ProtectedRoute loading={loading} user={user} roles={roles}>{element}</ProtectedRoute>;
  const routes = <Routes>
    <Route path="/login" element={loading ? guard(null) : user ? <Navigate to={homeFor(user.role)} replace /> : <Login setUser={setUser} />} />
    <Route path="/register" element={user ? <Navigate to={homeFor(user.role)} replace /> : <Register setUser={setUser} />} />
    <Route path="/" element={guard(<Navigate to={homeFor(user?.role)} replace />)} />
    {['admin','trainer','student'].map(role => <Route key={role} path={`/${role}/dashboard`} element={guard(<Dashboard user={user || { name: '', role }} />, [role])} />)}
    <Route path="/admin/users" element={guard(<Users />, ['admin'])} />
    <Route path="/courses" element={guard(<Courses />)} />
    <Route path="/courses/:id" element={guard(<CourseDetails />)} />
    <Route path="/mcq" element={guard(<MCQ />)} />
    <Route path="/practice" element={guard(<Practice />)} />
    <Route path="/progress" element={guard(<Progress />)} />
    <Route path="*" element={guard(<Navigate to={homeFor(user?.role)} replace />)} />
  </Routes>;
  if (!user) return <Container maxWidth="lg" sx={{ py: 5 }}>{routes}</Container>;
  return <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(130deg,#f5f3ff,#eff9ff 55%,#fff4f4)' }}>
    <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} user={user} />
    <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} setUser={setUser} />
      <Container component="main" maxWidth="xl" sx={{ py: 4 }}>{routes}</Container>
    </Box>
  </Box>;
}
