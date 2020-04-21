import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
import EditIcon from "@material-ui/icons/Edit";
import UpdateQuiz from "./UpdateQuiz";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

const QuizTableMain = ({ reloadQuiz, setReloadQuiz, match }) => {
  const listQuizzes = async () => {
    const Url = `/DoctorMakeQuiz/GetQuizzes`;
    const { data } = await post(Url, null, {
      params: { sub_Id: match.params.courseId },
    });
    setAllQuiz(data);
  };

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allQuiz, setAllQuiz] = useState();
  const [displayedQuiz, setDisplayedQuiz] = useState();
  const [currentEditedQuiz, setCurrentEditedQuiz] = useState();
  const [UpdateQuizIsOpen, setUpdateQuizIsOpen] = useState(false);

  //----------------------------------------------------------------------------------------------------------

  const Updatequiz = async (
    Quiz,
    ChangedName,
    ChangedDate,
    ChangedDescription,
    ChangedDuration,
    ChangedTimePicker,
    callback
  ) => {
    const url = "/DoctorMakeQuiz/UpdateQuizInfo";
    await post(url, null, {
      params: {
        QuizID: Quiz.id,
        name: ChangedName,
        description: ChangedDescription,
        startDate: ChangedDate.start,
        endDate: ChangedDate.end,
        startTime: ChangedTimePicker.start,
        endTime: ChangedTimePicker.end,
        duration: ChangedDuration,
        shuffleQuestion: "true",
        subID: match.params.courseId,
      },
    });
    setReloadQuiz(true);
    if (callback) callback();
  };

  useEffect(() => {
    if (reloadQuiz === true) {
      listQuizzes();
      setReloadQuiz(false);
    }
  }, [reloadQuiz]);

  useEffect(() => {
    if (allQuiz) {
      setDisplayedQuiz([...allQuiz]);
    }
  }, [allQuiz]);

  useEffect(() => {
    listQuizzes();
  }, [538]);

  return (
    <React.Fragment>
      <UpdateQuiz
        title="Update Quiz"
        CurrentName={currentEditedQuiz?.Name}
        sDate={currentEditedQuiz?.startDate}
        eDate={currentEditedQuiz?.endDate}
        sTime={currentEditedQuiz?.startTime}
        eTime={currentEditedQuiz?.endTime}
        /* TODO: al duration dyh lazm trg3 mn get quizz 34an a3mlha set bl value aly kan al dr. md5lha */
        durat="15"
        descr={currentEditedQuiz?.description}
        isOpened={UpdateQuizIsOpen}
        onClose={() => setUpdateQuizIsOpen(false)}
        onSubmit={({
          ChangedName,
          ChangedDate,
          ChangedDescription,
          ChangedDuration,
          ChangedTimePicker,
        }) =>
          Updatequiz(
            currentEditedQuiz,
            ChangedName,
            ChangedDate,
            ChangedDescription,
            ChangedDuration,
            ChangedTimePicker,
            () => setUpdateQuizIsOpen(false)
          )
        }
      />
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "170vh",
          marginTop: "10px",
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
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                {}
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
                {/* Description cell */}
                <TableCell align="right">{quiz.description}</TableCell>
                {/* Start Date cell */}
                <TableCell align="right">{quiz.startDate}</TableCell>
                {/* End Date cell */}
                <TableCell align="right">{quiz.endDate}</TableCell>
                {/* Start Time cell */}
                <TableCell align="right">{quiz.startTime}</TableCell>
                {/* End Time cell */}
                <TableCell align="right">{quiz.endTime}</TableCell>
                <TableCell>
                  <Tooltip title="Delete" placement="bottom">
                    <Button size="small">
                      <DeleteIcon
                        onClick={() => {
                          post("/DoctorMakeQuiz/DeleteQuiz", null, {
                            params: { QuizID: quiz.id },
                          })
                            .then(() => window.location.reload())
                            .catch((err) => console.error(err));
                        }}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Update" placement="bottom">
                    <Button size="small">
                      <EditIcon
                        onClick={() => {
                          setUpdateQuizIsOpen(true);
                          setCurrentEditedQuiz(quiz);
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withRouter(QuizTableMain);
