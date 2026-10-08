import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
import api from "../api";

export default function CourseDetails(){
 const {id}=useParams(); const [course,setCourse]=useState(null);
 useEffect(()=>{api.get(`/courses/${id}`).then(r=>setCourse(r.data));},[id]);
 if(!course) return <Typography>Loading course...</Typography>;
 return <Paper sx={{p:4}}>
  <Typography variant="h3">{course.title}</Typography>
  <Typography color="text.secondary" sx={{my:2}}>{course.description}</Typography>
  <Alert severity="info" sx={{my:3}}>{course.level} · {course.duration} · {course.lesson_count} lessons · {course.question_count} MCQs</Alert>
  <Typography variant="h5" sx={{mb:2}}>Course Lessons</Typography>
  {course.lessons.map(x=><Accordion key={x.id}>
   <AccordionSummary expandIcon={<ExpandMoreIcon/>}><Typography>{x.order}. {x.title}</Typography></AccordionSummary>
   <AccordionDetails><Typography>{x.content}</Typography></AccordionDetails>
  </Accordion>)}
  <Button sx={{mt:3}} variant="contained" component={Link} to={`/mcq?course=${course.id}`}>Start Assessment</Button>
 </Paper>
}
