import React from "react";
import Button from "@material-ui/core/Button";
import Form from "react-jsonschema-form";
import ChooseType from "../../pages/ChooseType";
import Snackbar from "../snackbar/Snackbar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";

import { Input, Paper, MenuItem, Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 7}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit * 4}px`
  },
  dividers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
   
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {}
});

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploaded: false,
      submitted: false,
      jsonFile: null,
      companytypes: []
    };
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
    console.log(event.target.files[0]);
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("myFile", this.state.selectedFile);
    axios
      .post("http://localhost:3000/routes/api/admins/uploadfile", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
        this.setState({
          uploaded: true,
          submitted: false,
          jsonFile: res.data.data
        });
      });
  };
  onSubmitHandler = () => {
    const data = new FormData();
    data.append("myFile", this.state.selectedFile);
    axios
      .post("http://localhost:3000/routes/api/admins/submit-form", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status

        this.setState({ submitted: true });
      });
  };

  onDeleteHandler = () => {
    const data = sessionStorage.getItem("type");
    console.log(data);
    fetch("http://localhost:3000/routes/api/admins/delete-form", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("jwtToken")
      },
      body: JSON.stringify({ formName: data })
    })
    return <Snackbar variant="error" message="error" />
  };

  handleDisplay = state => {
    return state.uploaded && !state.submitted ? (
      <Button onClick={this.onSubmitHandler}>Submit</Button>
    ) : (
      console.log("s")
    );
  };

  handleFile = state => {
    const MyCustomWidget = props => {
      return (
        <Input
          type="text"
          className="custom"
          value={props.value}
          required={props.required}
          onChange={event => props.onChange(event.target.value)}
        />
      );
    };

    const widgets = {
      myCustomWidget: MyCustomWidget
    };

    const uiSchema = {
      "ui:widget": "myCustomWidget"
    };

    if (state.jsonFile) {
      return (
        <Form schema={state.jsonFile} uiSchema={uiSchema} widgets={widgets} />
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={16}>
          <div>
            <h1 style={{ marginBottom: 50 }}>Add new Company Type</h1>

            <input type="file" name="myfile" onChange={this.onChangeHandler} />
            <Button onClick={this.onClickHandler}>Upload</Button>
            {this.handleDisplay(this.state)}
            {this.handleFile(this.state)}
          </div>
        </Paper>
        <Divider />

        <Paper className={classes.paper} elevation={16}>
            <h1 style={{ marginBottom: 50 }}>Delete Existing Company Type</h1>
          <div className={classes.dividers}>
            <ChooseType style={{marginRight:100}}/>
            <Button variant="outlined" onClick={this.onDeleteHandler}>
              Delete
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}
SimpleReactFileUpload.propTypes = {
  classes: PropTypes.object
};
export default withStyles(styles)(SimpleReactFileUpload);
