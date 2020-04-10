import React, { useState, useEffect } from "react";
import { post, get } from "axios";
import Tooltip from "@material-ui/core/Tooltip";

import {
    Dialog,
    Typography,
    Grid,
    withStyles,
    TextField,
    Button,
} from "@material-ui/core";

const RenameForm = ({
    onClose,
    isOpened,
    match,
    onSubmit,
    classes,
}) => {

    // ---------------------------- variables with it's states that we use it in this Dialog ------------------- 
    const [ChangedName, setChangedName] = useState("");


    //----------------------------------------------------------------------------------------------------------

    const resetStates = () => {
        setChangedName("");
    };


    return (
        isOpened && (
            <Dialog
                onClose={() => {
                    onClose();
                    resetStates();
                }}
                open={isOpened}
                maxWidth="sm"
                fullWidth
                PaperProps={{ className: classes.dialogPaper }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    justify="center"
                    className={classes.dialog}
                >
                    <Grid item className={classes.titleContainer}>
                        <Typography
                            variant="h3"
                            className={classes.boldText}
                            align="center"
                        >
                            Rename
            </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container justify="space-around">
                            <Grid item xs={11}>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="stretch"
                                    justify="center"
                                    spacing={3}
                                >
                                    <Grid item>
                                        <TextField
                                            label="Another Name"
                                            multiline
                                            rows={2}
                                            value={ChangedName}
                                            onChange={(e) => {
                                                setChangedName(e.target.value);
                                            }}
                                            variant="outlined"
                                            classes={{
                                                root: classes.textFieldRoot,
                                            }}
                                            InputProps={{
                                                classes: {
                                                    notchedOutline: classes.notchedOutline,
                                                },
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.label,
                                                },
                                            }}
                                            style={{ width: "350px" }}
                                        />

                                    </Grid>
                                    <Grid item>
                                        <Grid container justify="flex-end" spacing={1}>
                                            <Grid item>
                                                <Button
                                                    variant="outlined"
                                                    className={classes.cancelButton}
                                                    onClick={onClose}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        className={classes.boldText}
                                                        color="error"
                                                    >
                                                        Close
                                                </Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            className={classes.createButton}
                                            onClick={() => {
                                                resetStates();
                                                onSubmit({
                                                    ChangedName,
                                                });
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            className={
                                                classes.createText
                                            }
                                        >
                                            Create
                                            </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        )
    );
};

// Dialog styles
const styles = () => ({
    dialog: {
        padding: "10px 0px",
    },
    titleContainer: {
        marginBottom: "18px",
    },
    textFieldRoot: {
        backgroundColor: "white",
        borderRadius: "7px",
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: `black !important`,
    },
    label: {
        color: "black !important",
        fontWeight: "600",
    },
    dialogPaper: {
        minHeight: "50vh",
        padding: "20px 0px",
    },
    createButton: {
        height: "40px",
        width: "130px",
        borderRadius: "16px",
        border: "2px black solid",
    },
    cancelButton: {
        height: "40px",
        width: "130px",
        borderRadius: "16px",
        border: "2px red solid",
    },
    boldText: {
        fontWeight: "600",
    },
    createText: {
        color: "silver",
    },
});

export default withStyles(styles)(RenameForm);
