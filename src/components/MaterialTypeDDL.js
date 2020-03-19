import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

class ControlledOpenSelect extends Component {
  state = {
    open: false
  };

  render() {
    const { type, setType } = this.props;
    
    const setOpen = value => this.setState({ open: value });

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
      <div style={{ marginTop: "-115px", marginLeft: "500px" }}>
        <Button
          style={{ display: "block", marginTop: "4px" }}
          onClick={handleOpen}
        >
          Material Type
        </Button>
        <FormControl
          style={{
            margin: "2px",
            minWidth: 100
          }}
        >
          <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={this.state.open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={"NULL"}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={0}>Lecture</MenuItem>
            <MenuItem value={1}>Lab</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default ControlledOpenSelect;
