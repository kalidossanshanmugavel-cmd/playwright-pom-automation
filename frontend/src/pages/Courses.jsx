import React from "react";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((r) => setCourses(r.data));
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={{ xs: 12, md: 4 }} key={course.id}>
            <Card className="course-card" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5">{course.title}</Typography>
                <Typography color="text.secondary" sx={{ my: 2 }}>{course.description}</Typography>
                <Typography>{course.level} · {course.duration}</Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/courses/${course.id}`}>View Course</Button>
                <Button component={Link} to={`/mcq?course=${course.id}`}>Take MCQ</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
