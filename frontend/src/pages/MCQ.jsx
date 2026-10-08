import React from "react";
import {
  Alert, Box, Button, FormControl, FormLabel, LinearProgress,
  MenuItem, Paper, Radio, RadioGroup, Select, Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

export default function MCQ() {
  const [params] = useSearchParams();
  const initialCourse = params.get("course") || "";
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState(initialCourse);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.get("/courses").then((r) => {
      setCourses(r.data);
      if (!courseId && r.data.length) setCourseId(String(r.data[0].id));
    });
  }, []);

  useEffect(() => {
    if (!courseId) return;
    api.get(`/mcq?course_id=${courseId}`).then((r) => {
      setQuestions(r.data);
      setAnswers({});
      setResult(null);
      setCurrentIndex(0);
      setShuffleKey(0);
    });
  }, [courseId]);

  const visibleQuestions = useMemo(() => {
    if (!shuffleKey) return questions;
    return [...questions].sort(() => Math.random() - 0.5);
  }, [questions, shuffleKey]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [shuffleKey]);

  const currentQuestion = visibleQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === visibleQuestions.length - 1;
  const progress = visibleQuestions.length
    ? ((currentIndex + 1) / visibleQuestions.length) * 100
    : 0;

  const submit = async () => {
    const payload = {
      course_id: Number(courseId),
      answers: Object.entries(answers).map(([question_id, answer]) => ({
        question_id: Number(question_id),
        answer,
      })),
    };
    const { data } = await api.post("/mcq/submit", payload);
    setResult(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>MCQ Assessment</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Select
          aria-label="Select course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          sx={{ minWidth: 250 }}
        >
          {courses.map((c) => (
            <MenuItem key={c.id} value={String(c.id)}>{c.title}</MenuItem>
          ))}
        </Select>
        <Button variant="outlined" onClick={() => setShuffleKey((x) => x + 1)}>
          Shuffle Questions
        </Button>
      </Box>

      {currentQuestion && !result && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Question {currentIndex + 1} of {visibleQuestions.length}
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>

          <Paper sx={{ p: 3, mb: 3 }}>
            <FormControl fullWidth>
              <FormLabel sx={{ fontSize: 18, color: "text.primary", mb: 1 }}>
                {currentIndex + 1}. {currentQuestion.question}
              </FormLabel>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => setAnswers({
                  ...answers,
                  [currentQuestion.id]: e.target.value,
                })}
              >
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 0.5 }}>
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <Radio value={key} checked={answers[currentQuestion.id] === key} />
                      <Typography>{key}. {value}</Typography>
                    </label>
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Button
              variant="outlined"
              disabled={isFirst}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Previous
            </Button>

            {!isLast ? (
              <Button
                variant="contained"
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={submit}>
                Submit Assessment
              </Button>
            )}
          </Box>
        </>
      )}

      {result && (
        <Alert severity={result.percentage >= 60 ? "success" : "warning"} sx={{ mt: 3 }}>
          Score: {result.score}/{result.total} ({result.percentage}%)
        </Alert>
      )}
    </Box>
  );
}
