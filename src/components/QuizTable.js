import React, { useState, useEffect } from "react";
import { post } from "axios";
import { withRouter } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import { SideBar } from "../components";

const QuizTable = ({ reloadQuiz, setReloadQuiz }) => {
  // hna al function aly hnady 3lyha fy al api 34an tmla al table dh ...

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // asm al function aly htygy mn al api 34an tmla al table ...
  }, [reloadQuiz]);

  useEffect(() => {
    if (allQuiz) {
      setDisplayedQuiz([...allQuiz]);
    }
  }, [allQuiz]);

  return (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item xs={2}>
        <SideBar />
      </Grid>
      <Grid item xs={10}>
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
            maxWidth: "170vh",
            marginTop: "10px",
            marginLeft: "-30px",
          }}
        >
          <Table
            style={{
              minWidth: 650,
            }}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              {/* The Header Of the Table That contains [1] Name ... [2] ID ... [3] E-Mail  */}
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                >
                  Quiz Name
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  Duration
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  Description
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  Start Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  End Date
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  Start Time
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Impact",
                  }}
                  align="right"
                >
                  End Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedQuiz?.map((quiz, index) => (
                <TableRow
                  key={index}
                  style={
                    index % 2
                      ? { background: "#E8FDFF" }
                      : { background: "#E8FDFF" }
                  }
                >
                  {/* Quiz Name cell */}
                  <TableCell>
                    <Grid container spacing={1}>
                      <Typography>{quiz.Name}</Typography>
                    </Grid>
                  </TableCell>
                  {/* Duration cell */}
                  <TableCell align="right">{quiz.Duration}</TableCell>
                  {/* Description cell */}
                  <TableCell align="right">{quiz.Description}</TableCell>
                  {/* Start Date cell */}
                  <TableCell align="right">{quiz.StartDate}</TableCell>
                  {/* End Date cell */}
                  <TableCell align="right">{quiz.EndDate}</TableCell>
                  {/* Start Time cell */}
                  <TableCell align="right">{quiz.StartTime}</TableCell>
                  {/* End Time cell */}
                  <TableCell align="right">{quiz.EndTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default withRouter(QuizTable);
