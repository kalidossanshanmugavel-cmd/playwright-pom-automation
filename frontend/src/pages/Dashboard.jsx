import React from "react";
import { Box, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.get("/courses"), api.get("/progress")]).then(([c, p]) => {
      setCourses(c.data);
      setProgress(p.data);
    });
  }, []);

  const lessons = courses.reduce((n, c) => n + c.lesson_count, 0);
  const mcqs = courses.reduce((n, c) => n + c.question_count, 0);
  const stats = [
    { title: "Courses", value: courses.length, route: "/courses", color: "#6255d9" },
    { title: "Lessons", value: lessons, route: "/courses", color: "#008d9d" },
    { title: "MCQs", value: mcqs, route: "/mcq", color: "#d35b80" },
    { title: "Attempts", value: progress.length, route: "/progress", color: "#ef8a26" },
  ];

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>{user.role?.toUpperCase()} Dashboard · Hello, {user.name}</Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Explore your personalized Recitation workspace.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Card sx={{ borderRadius: 4, color: "white", background: `linear-gradient(135deg,${stat.color},#242450)`, boxShadow: "0 12px 26px #25256522" }}>
              <CardContent>
                <Typography sx={{ color: "#ffffffcc" }}>{stat.title}</Typography>
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate(stat.route)}
                  underline="hover"
                  aria-label={`Open ${stat.title}`}
                  sx={{ display: "inline-block", textAlign: "left", cursor: "pointer", color: "white" }}
                >
                  <Typography variant="h3" component="span" sx={{ fontWeight: 500 }}>
                    {stat.value}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
