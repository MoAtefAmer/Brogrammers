import React, { Component } from "react";
import NotRequired from "../layout/inputs/NotRequired";
import Gender from "../layout/inputs/Gender";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Icon, Button } from "@material-ui/core";
import SaveChangesButton from "../layout/Dialogs/SaveChangesButton";
import Date from "../layout/inputs/Date";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  cluster:{
      display: 'flex'
  }
});
class EditProfileReviewer extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviewer: {
        name: null,
        email: null,
        password: null,
        phone: null,
        address: null,
        ssn: null,
        yearsOfExperience: null,
        age: null,
        gender: null,
        birth: null
      }
    }
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName];
      }
    }
  };

  handleSubmission(e) {
    let updatedData = this.state.reviewer;
    this.clean(updatedData);
    console.log("is this working " + updatedData);
    fetch("http://localhost:3000/api/reviewer/", {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.props.token
      }
    }).then(response => {
      console.log("Information updated successfully");
    });
  }


  onChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => {
        return {
          admin: {
            ...prevState.lawyer,
            [name]: value
          }
        };
      },
      () => console.log(value)
    );
  }

  handleDate(v) {
    console.log(v);
    this.setState( prevState => ({ lawyer : 
         {...prevState.lawyer, birth: v
         }
       }))
      
   }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Icon className={classes.icon} color="primary">
            add_circle
          </Icon>
          <h2>Edit Your Profile</h2>
          <NotRequired name={"name"} field={"Name"} type="text" callBack={this.onChange} />
          <NotRequired name={"email"} field={"Email"} type="email" callBack={this.onChange}/>
          <NotRequired name={"password"} field={"Password"} type="password" callBack={this.onChange}/>
          <NotRequired name={"phone"} field={"Telephone"} type="text" callBack={this.onChange}/>
          <NotRequired name={"address"} field={"Address"} type="text" callBack={this.onChange}/>
          <NotRequired name={"ssn"} field={"Social Security Number"} type="text" callBack={this.onChange}/>
          <NotRequired name={"yearsOfExperience"} field={"Years Of Experience "} type="number" callBack={this.onChange}/>
          <NotRequired name={"age"} field={"Age"} type="number" callBack={this.onChange}/>
          <div className={classes.cluster}>
            <Gender name={"gender"} callBack={this.onChange}/>
            <Date name={"birth"} field={"Birth Date"} callBack={this.handleDate}/>
          </div>
          <SaveChangesButton onClick={this.handleSubmission} />
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(EditProfileReviewer);
