import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import { withRouter } from "react-router-dom";
import mime from "mime-types";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import RenameForm from "./RenameForm";

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
import VideoIcon from "@material-ui/icons/Videocam";
import LinkIcon from "@material-ui/icons/Link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DownloadIcon from "@material-ui/icons/GetAppSharp";
import DeleteIcon from "@material-ui/icons/DeleteOutlineSharp";
//-----------------------------------------------------------------------------------------------------------

const AssignmentStudentAnswers = ({
  match,
  /* reloadAssignment,
  setReloadAssignment, */
}) => {
  // ---------------------------- variables with it's states that we use it in this Page -------------------
  const [allMaterials, setAllMaterials] = useState();
  const [allAssignments, setAllAssignments] = useState();
  const [currentFolderId, setCurrentFolderId] = useState();
  const [displayedMaterials, setDisplayedMaterials] = useState();
  const [RenameIsOpenMaterial, setRenameIsOpenMaterial] = useState(false);
  const [currentEditedMaterial, setCurrentEditedMaterial] = useState();
  const [RenameIsOpenAssignment, setRenameIsOpenAssignment] = useState(false);
  // --------------------------------------------------------------------------------------------------------

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "165vh",
          marginLeft: "28px",
          marginTop:"10px"
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
              >
                Student Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontFamily: "Impact",
                }}
                align="right"
              >
                Student ID
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
            {displayedMaterials?.map((material, index) => (
              <TableRow
                style={
                  index % 2
                    ? { background: "	#E8FDFF	" }
                    : { background: "	#E8FDFF	" }
                }
                key={index}
              >
                {/* File Name Cell */}
                <TableCell align="right">{material.type}</TableCell>
                {/* Student NAme Cell */}
                <TableCell align="right">{material.type}</TableCell>
                {/* Student ID Cell */}
                <TableCell align="right">{material.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default withRouter(AssignmentStudentAnswers);
