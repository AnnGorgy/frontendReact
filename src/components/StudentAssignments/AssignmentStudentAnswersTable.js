import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@material-ui/core";

const AssignmentStudentAnswersTable = ({
  match,
  setCrumbs,
  reloadAssignments,
  setReloadAssignments,
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allAssignmentsFiles, setAllAssignmentsFiles] = useState();
  const [allAssignmentsFolders, setAllAssignmentsFolders] = useState();
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [displayedAssignments, setDisplayedAssignments] = useState();
  const [assignmets, setAssignments] = useState();
  // --------------------------------------------------------------------------------------------------------

  const listAssignmentsFolders = async () => {
    const Url = `/Student_Answers/GetAssignmentanswerFolders`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId, studentId: 1 },
    });
    setAllAssignmentsFolders(data);
  };

  const listAssignmentsFiles = async () => {
    const Url = `/Student_Answers/GetAssignmentAnswerFiles`;
    const { data } = await post(Url, null, {
      params: { subjectId: match.params.courseId, studentId: 1 },
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
  }, [allAssignmentsFolders, allAssignmentsFiles]);

  useEffect(() => {
    if (displayedAssignments) {
      setAssignments([
        ...displayedAssignments.filter(
          (assignment) => assignment.parentID === currentFolderId
        ),
      ]);
    }
  }, [displayedAssignments, currentFolderId]);

  useEffect(() => {
    if (reloadAssignments === true) {
      listAssignmentsFolders();
      listAssignmentsFiles();
      setReloadAssignments(false);
    }
  }, [reloadAssignments]);

  useEffect(() => {
    setCrumbs([
      {
        label: "Home",
        onClick: () => {
          setCurrentFolderId(null);
          setCrumbs((prevState) => [...prevState.slice(0, 1)]);
        },
        Icon: FolderIcon,
      },
    ]);
  }, []);

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
            {assignmets?.map((assignment, index) => (
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
                    setCrumbs((prevCrumbs) => [
                      ...prevCrumbs,
                      {
                        label: assignment.name,
                        id: assignment.id,
                        Icon: FolderIcon,
                        onClick: () => {
                          setCurrentFolderId(assignment.id);
                          setCrumbs((prevState) => {
                            if (
                              prevState[prevState.length - 1].id ===
                              assignment.id
                            )
                              return prevState;
                            return [
                              ...prevState.slice(0, prevState.length - 1),
                            ];
                          });
                        },
                      },
                    ]);
                  }
                }}
              >
                {/* File Name Cell */}
                <TableCell>{assignment.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete" placement="bottom">
                    <Button size="small">
                      {assignment.type === "file" && (
                        <DeleteIcon
                          onClick={() => {
                            get("/Student_Answers/deleteAssignmentAnswer", {
                              params: { fileId: assignment.id },
                            })
                              .then(() => window.location.reload())
                              .catch((err) => console.error(err));
                          }}
                        />
                      )}
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

export default withRouter(AssignmentStudentAnswersTable);
