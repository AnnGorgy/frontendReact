import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

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

//------------------------------------------------- Icons ---------------------------------------------------
import FolderIcon from "@material-ui/icons/Folder";
import FileIcon from "@material-ui/icons/DescriptionOutlined";
//-----------------------------------------------------------------------------------------------------------

const AssignmentStudentAnswers = ({
  match,
  reloadAssignments,
  setReloadAssignments,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedAssignments, setDisplayedAssignments] = useState();
  // --------------------------------------------------------------------------------------------------------

  const listAssignments = async () => {
    const Url = `/Student_Answers/Get_Assignment_answer`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId, studentId: 1 },
    });
    setAllAssignments(data);
  };

  useEffect(() => {
    if (reloadAssignments === true) {
      listAssignments();
      setReloadAssignments(false);
    }
  }, [reloadAssignments]);

  useEffect(() => {
    listAssignments();
  }, [match.params.courseId]);

  /* useEffect(() => {
      if (allAssignments) {
        setDisplayedAssignments([
          ...allAssignments.filter(
            (assignment) => assignment.Parent_ID === currentFolderId
          ),
        ]);
      }
    }, [currentFolderId, allAssignments]); */

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "165vh",
          marginLeft: "28px",
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
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
              >
                File Name
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedAssignments?.map((material, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "	#E8FDFF	" }
                    : { background: "	#E8FDFF	" }
                }
                key={index}
              >
                {/* File Name Cell */}
                <TableCell align="right">{material.files}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withRouter(AssignmentStudentAnswers);
