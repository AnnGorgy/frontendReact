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

const DoctorgetAssignmentsStudentsTable = ({ match }) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignmentsFiles, setAllAssignmentsFiles] = useState();
  const [allAssignmentsFolders, setAllAssignmentsFolders] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedAssignments, setDisplayedAssignments] = useState();
  const [assignmets, setAssignments] = useState();
  // --------------------------------------------------------------------------------------------------------

  const listAssignmentsFolders = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsFolders`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignmentsFolders(data);
  };

  const listAssignmentsFiles = async () => {
    const Url = `/Doctor_Manage_student/getAssignmentsFiles`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId },
    });
    setAllAssignmentsFiles(data);
  };

  useEffect(() => {
    listAssignmentsFiles();
    listAssignmentsFolders();
  }, [match.params.courseId]);

  useEffect(() => {
    if (allAssignmentsFolders && allAssignmentsFiles) {
      setDisplayedAssignments([
        ...allAssignmentsFolders,
        ...allAssignmentsFiles,
      ]);
    }
    if (displayedAssignments) {
      setAssignments([
        ...displayedAssignments.filter(
          (assignment) => assignment.parent_ID === currentFolderId
        ),
      ]);
    }
  }, [
    allAssignmentsFolders,
    currentFolderId,
    allAssignmentsFiles,
    displayedAssignments,
  ]);

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
            {displayedAssignments?.map((assignment, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "	#E8FDFF	" }
                    : { background: "	#E8FDFF	" }
                }
                key={index}
                onClick={() => {
                  if (assignment.type === "folder") {
                    setCurrentFolderId(assignment.id);
                    console.log("ahmed",displayedAssignments);
                    console.log("mohamed",assignmets);
                  }
                }}
              >
                {/* File Name Cell */}
                <TableCell>{assignment.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withRouter(DoctorgetAssignmentsStudentsTable);
