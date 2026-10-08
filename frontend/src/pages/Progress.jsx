import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api";

export default function Progress() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/progress").then((r) => setRows(r.data));
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>Learning Progress</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.score}/{row.total}</TableCell>
                <TableCell>{row.percentage}%</TableCell>
              </TableRow>
            ))}
            {!rows.length && (
              <TableRow><TableCell colSpan={3}>No assessment attempts yet.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
