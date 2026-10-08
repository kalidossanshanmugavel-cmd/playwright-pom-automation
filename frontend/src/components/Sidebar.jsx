import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import CodeIcon from "@mui/icons-material/Code";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { homeFor } from "../roles";
import { useLocation, useNavigate } from "react-router-dom";

const expandedWidth = 240;
const collapsedWidth = 72;

const navItems = [
  { label: "Dashboard", path: "DASHBOARD", icon: <DashboardIcon /> },
  { label: "Courses", path: "/courses", icon: <MenuBookIcon /> },
  { label: "MCQ", path: "/mcq", icon: <QuizIcon /> },
  { label: "Practice", path: "/practice", icon: <CodeIcon /> },
  { label: "Progress", path: "/progress", icon: <TrendingUpIcon /> },
];

export default function Sidebar({ collapsed, setCollapsed, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const width = collapsed ? collapsedWidth : expandedWidth;
  const items = [...navItems.map(item => item.path === "DASHBOARD" ? {...item, path: homeFor(user.role)} : item), ...(user.role === "admin" ? [{ label: "Users", path: "/admin/users", icon: <DashboardIcon /> }] : [])];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: (theme) => theme.transitions.create("width"),
          background: "linear-gradient(180deg,#24144e,#43338a 60%,#176c9a)",
          color: "white",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", minHeight: 64, px: collapsed ? 1 : 2 }}>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
            Recitation
          </Typography>
        )}
        <Tooltip title={collapsed ? "Expand sidebar" : "Minimize sidebar"}>
          <IconButton onClick={() => setCollapsed((value) => !value)} sx={{ mx: collapsed ? "auto" : 0 }}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderColor: "#ffffff33" }} />

      <List sx={{ px: 1 }}>
        {items.map((item) => (
          <Tooltip key={item.path} title={collapsed ? item.label : ""} placement="right">
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={{ minHeight: 48, borderRadius: 2, mb: 0.5, justifyContent: collapsed ? "center" : "initial", color: "white", "&.Mui-selected": { background: "#ffffff35" }, "&:hover": { background: "#ffffff22" } }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40, justifyContent: "center", color: "#d3e9ff" }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />
    </Drawer>
  );
}
