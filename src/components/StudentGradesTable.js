import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
import mime from "mime-types";
import Tooltip from "@material-ui/core/Tooltip";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";

const StudentGradesTable = ({ match }) => {
  const listAssignments = async () => {
    const Url = `/Student_Answers/GetAssingmentsGrades`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId, studentId: 1 },
    });
    setAllAssignments(data);
  };

  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignments, setAllAssignments] = useState();
  const [displayedGrades, setDisplayedGrades] = useState();
  //----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (allAssignments) {
      setDisplayedGrades([...allAssignments]);
    }
  }, [allAssignments]);

  useEffect(() => {
    listAssignments();
  }, [match.params.courseId]);

  return (
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
          minWidth: "650px",
        }}
        size="large"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
            >
              Assignment Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "black",
                color: "white",
                fontFamily: "Impact",
              }}
              align="right"
            >
              Grade
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
              {}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedGrades?.map((grades, index) => (
            <TableRow
              key={index}
              style={
                index % 2
                  ? { background: "#E8FDFF" }
                  : { background: "#E8FDFF" }
              }
            >
              {/* Assignment Name cell */}
              <TableCell>{grades.AssignmentName}</TableCell>
              {/* grade assignmet cell */}
              <TableCell align="right">{grades.AssignmentGrade}</TableCell>
              {/* Assignment Start Date cell */}
              <TableCell align="right">{grades.AssignmentstartDate}</TableCell>
              {/* Assignmet End Date cell */}
              <TableCell align="right">{grades.AssignmentendDate}</TableCell>
              <TableCell align="right">
                <Tooltip title="Download" placement="bottom">
                  <Button size="small">
                     <DownloadIcon
                       onClick={async () => {
                        const response = await get("/Student_Answers/downloadAssignmentAnswer", {
                          params: { AnswerID: grades.AssignmentId , studentID: 1 },
                          responseType: "blob",
                        });
                        var fileURL = window.URL.createObjectURL(
                          new Blob([response.data])
                        );
                        var fileLink = document.createElement("a");

                        fileLink.href = fileURL;
                        fileLink.setAttribute(
                          "download",
                          grades.AssignmentName +
                            "." +
                            mime.extension(response.data.type)
                        );
                        document.body.appendChild(fileLink);

                        fileLink.click();
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
  );
};
export default withRouter(StudentGradesTable);
