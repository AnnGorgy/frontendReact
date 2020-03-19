import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100
  }
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [type, setType] = React.useState('NULL');
  const [open, setOpen] = React.useState(false);

  

  }

  const handleChange = event => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  

  return (
    <div style={{marginTop:'-115px' , marginLeft:'500px'}}>
      <Button className={classes.button} onClick={handleOpen}>
        Material Type
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          onChange={handleChange}
        >
          <MenuItem value={'NULL'}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>Lecture</MenuItem>
          <MenuItem value={1}>Lab</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
