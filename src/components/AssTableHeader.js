// import React, { useState } from "react";
// import { post, get } from "axios";

// import { Grid, withStyles, Button, Typography } from "@material-ui/core";
// import {
//   BreadCrumbs,
//   AddMaterialPopOver,
//   CreateFileForm,
 
// } from "./";

// import AddMaterialIcon from "@material-ui/icons/AddCircleOutlineRounded";
// import { withRouter } from "react-router-dom";

// const AssTableHeader = ({
//   crumbs,
//   classes,
//   uploadUrl,
//   createUrl,
//   match,
//   setReloadMaterials
// }) => {
//   const [fileIsOpen, setFileIsOpen] = useState(false);
//   const [createButtonReference, setCreateButtonReference] = useState();
//   const [accountType, setaccountType] = useState(JSON.parse(localStorage.getItem("Information")).AccountType);

//   const handlePopOverClick = eventName => {
//     switch (eventName) {
//       case "File":
//         setFileIsOpen(true);
//         setCreateButtonReference(null);
//         break;
     
//       default:
//         break;
//     }
//   };

//   /* const uploadFile = async ({ file, name, description, callback }) => {
//     // TODO: make it constant on this service
//     const url = "";
//     const formData = new FormData();
//     formData.append("Document", file);
//     try {
//       await post(url, formData, {
//         params: {
//           Parent_ID: crumbs[crumbs.length - 1].id,
//           sub_Id: match.params.courseId,
//           Description: description,
//           File_Name: name,
//         },
//       });
//       setReloadMaterials(true);
//       if (callback) callback();
//     } catch (err) {
//       console.error(err);
//     }
//   }; */

 

//   return (
//     <React.Fragment>
//       <AddMaterialPopOver
//         createButtonReference={createButtonReference}
//         setCreateButtonReference={setCreateButtonReference}
//         onClick={handlePopOverClick}
//         Crumbs={crumbs}
//       />
//       <CreateFileForm
//         title="Create New File"
//         isOpened={fileIsOpen}
//         onClose={() => setFileIsOpen(false)}
//      /*     onSubmit={({ blobs, name, description }) =>
//           uploadFile({
//             file: blobs,
//             name,
//             description,
//             callback: () => setFileIsOpen(false)
//           }) 
//         } */
//       />
     
//       <Grid
//         container
//         justify="space-between"
//         alignItems="center"
//         className={classes.tableHeader}
//       >
//         <Grid item xs={7}>
//           {crumbs?.length ? (
//             <BreadCrumbs crumbs={crumbs} />
//           ) : (
//               <React.Fragment />
//             )}
//         </Grid>
//         {accountType == 1 && (
//           <Grid item>
//             <Button
//               ref={createButtonReference}
//               onClick={event => {
//                 setCreateButtonReference(event.currentTarget);
//               }}
//               className={classes.addButton}
//               size="small"
//             >
//               <Grid
//                 container
//                 spacing={1}
//                 alignItems="center"
//                 className={classes.addButtonBody}
//               >
//                 <Grid item>
//                   <AddMaterialIcon className={classes.addIcon} />
//                 </Grid>
//                 <Grid item>
//                   <Typography className={classes.buttonText}>
//                     Add New Resourses
//                 </Typography>
//                 </Grid>
//               </Grid>
//             </Button>
//           </Grid>)}
//       </Grid>
//     </React.Fragment>
//   );
// };

// const styles = () => ({
//   breadCrumpContainer: {
//     maxWidth: "100%"
//   },
//   addButton: {
//     borderRadius: "16px",
//     width: "240px",
//     color: "black",
//     backgroundColor:  "#7dbbb9",
//     "&:hover, &:focus": {
//       backgroundColor: "#CCE6E5",
//       color: "black"
//     }
//   },
//   addIcon: {
//     marginTop: "4px"
//   },
//   buttonText: {
//     color: "black"
//   },
//   addButtonBody: {
//     marginLeft: "4px",
//     marginRight: "4px"
//   },
//   tableHeader: {
//     paddingRight: "20px",
//     paddingLeft: "20px",
//     marginTop: "8px",
//     flexWrap: "nowrap"
//   },
//   noWrap: {
//     flexWrap: "nowrap"
//   }
// });

// export default withStyles(styles)(withRouter(AssTableHeader));
