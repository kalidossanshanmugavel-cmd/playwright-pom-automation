import React from "react";
import { Accordion,AccordionDetails,AccordionSummary,Box,Chip,MenuItem,Select,Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect,useState } from "react";
import api from "../api";

export default function Practice(){
 const [courses,setCourses]=useState([]),[courseId,setCourseId]=useState(""),[items,setItems]=useState([]);
 useEffect(()=>{api.get("/courses").then(r=>{setCourses(r.data); if(r.data.length)setCourseId(String(r.data[0].id));});},[]);
 useEffect(()=>{if(courseId)api.get(`/practice?course_id=${courseId}`).then(r=>setItems(r.data));},[courseId]);
 return <Box>
  <Typography variant="h4" sx={{mb:3}}>Practice Lab</Typography>
  <Select value={courseId} onChange={e=>setCourseId(e.target.value)} sx={{minWidth:280,mb:3}}>
   {courses.map(c=><MenuItem key={c.id} value={String(c.id)}>{c.title}</MenuItem>)}
  </Select>
  {items.map(x=><Accordion key={x.id}>
   <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
    <Typography sx={{flexGrow:1}}>{x.title}</Typography><Chip size="small" label={x.difficulty}/>
   </AccordionSummary>
   <AccordionDetails><Typography>{x.question}</Typography></AccordionDetails>
  </Accordion>)}
 </Box>
}
