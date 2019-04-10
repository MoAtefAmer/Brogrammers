import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/pages/Register";
import RegisterLawyer from "./components/pages/RegisterLawyer";
import RegisterReviewer from "./components/pages/RegisterReviewer";
import RegisterAdmin from "./components/pages/RegisterAdmin";
import "typeface-roboto";
import ReviewerCases from "./components/pages/ReviewerCases";
import LawyerCases from "./components/pages/LawyerCases";
import AdminCases from "./components/pages/AdminCases";
import InvestorCompanyRegSSC from "./components/pages/InvestorCompanyRegSSC";
import InvestorCompanyRegSPC from "./components/pages/InvestorCompanyRegSPC";
import EditProfileInvestor from "./components/pages/EditProfileInvestor";
import EditProfileAdmin from "./components/pages/EditProfileAdmin";
import EditProfileLawyer from "./components/pages/EditProfileLawyer";
import EditProfileReviewer from "./components/pages/EditProfileReviewer";
import InvestorRequests from "./components/pages/InvestorRequests";
import LawyerComment from "./components/pages/LawyerComment";
import ReviewerComment from "./components/pages/ReviewerComment";
import AdminSignIn from "./components/signin/AdminSignin";
import ReviewerSignIn from "./components/signin/ReviewerSignIn";
import LawyerSignIn from "./components/signin/LawyerSignIn";
import SignIn from "./components/signin/Signin";
import ComplexButton from "./components/layout/Complex Button/ComplexButton";
import ViewLawyerCasesbyID from "./components/pages/ViewLawyerCasesbyID.js";
import ViewReviewerCasesbyID from "./components/pages/ViewReviewerCasesbyID";
import ViewApprovedCompanies from "./components/pages/ViewApprovedCompanies";
import ChooseCompanyType from "./components/pages/ChooseCompanyType";

class App extends Component {
  constructor(props) {
    super(props);
    this.token = null;
    this.auth = null;
    this.state = {
      test: [],
      lawyerCases: [],
      companys: [],
      isLoaded: false,
      token: null,
      auth: false,
      type: ""
    };
  }

  setToken(t, a, type, id) {
    sessionStorage.setItem("jwtToken", t);
    sessionStorage.setItem("auth", a);
    sessionStorage.setItem("type", type);
    sessionStorage.setItem("id", id);
    console.log(sessionStorage.getItem("id"));
  }

  render() {
    console.log(this.state.token + " " + this.state.auth);
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" render={props => <ComplexButton />} />{" "}
          <Route
            exact
            path="/register"
            render={props => <Register callBack={this.setToken} />}
          />
          <Route
            exact
            path="/admin/register-lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterLawyer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          <Route
            exact
            path="/chooseType"
            component={ChooseCompanyType}
           
          />{" "}
          <Route
            exact
            path="/admin/register-reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterReviewer
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          <Route
            exact
            path="/admin/register-admin"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <RegisterAdmin
                  callBack={this.setToken}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <AdminSignIn callBack={this.setToken} />
              )
            }
          />{" "}
          {/* <Route exact path="/admin/register-admin" render={props => (<RegisterAdmin callBack={this.setToken}/>)} /> */}{" "}
          <Route
            exact
            path="/editprofile/investor"
            render={props => (
              <EditProfileInvestor
                token={this.state.token}
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "i" ? (
                <EditProfileInvestor
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <SignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/editprofile/admin"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "a" ? (
                <EditProfileAdmin token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <AdminSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/editprofile/lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <EditProfileLawyer token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/addcomment/lawyer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <LawyerComment token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/addcomment/reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <ReviewerComment token={sessionStorage.getItem("jwtToken")} />
              ) : (
                <ReviewerSignIn />
              )
            }
          />
          <Route
            exact
            path="/editprofile/reviewer"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <EditProfileReviewer
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <ReviewerSignIn />
              )
            }
          />
          <Route
            exact
            path="/SSCForm"
            render={props => (
              <InvestorCompanyRegSSC
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
          />{" "}
          <Route
            exact
            path="/SPCForm"
            render={props => (
              <InvestorCompanyRegSPC
                token={sessionStorage.getItem("jwtToken")}
              />
            )}
          />{" "}
          <Route
            exact
            path="/lawyer/view-lawyer-cases-by-id"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "l" ? (
                <ViewLawyerCasesbyID
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <LawyerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/reviewer/view-reviewer-cases-by-id"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "r" ? (
                <ViewReviewerCasesbyID
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <ReviewerSignIn />
              )
            }
          />{" "}
          <Route
            exact
            path="/investors/MyRequests/all"
            component={() =>
              sessionStorage.getItem("auth") &&
              sessionStorage.getItem("type") == "i" ? (
                <InvestorRequests
                  id={sessionStorage.getItem("id")}
                  token={sessionStorage.getItem("jwtToken")}
                />
              ) : (
                <SignIn />
              )
            }
          />
          <div>
            <Route exact path="/Investorlogin" render={props => <SignIn />} />{" "}
            <Route
              exact
              path="/Lawyerlogin"
              render={props => <LawyerSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/Reviewerlogin"
              render={props => <ReviewerSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/Adminlogin"
              render={props => <AdminSignIn callBack={this.setToken} />}
            />
            <Route
              exact
              path="/LawyerCases"
              render={props => (
                <LawyerCases token={sessionStorage.getItem("jwtToken")} />
              )}
            />
            {/* Waiting for Login token  */}{" "}
            <Route
              exact
              path="/ReviewerCases"
              render={props => (
                <ReviewerCases token={sessionStorage.getItem("jwtToken")} />
              )}
            />
            <Route
              exact
              path="/AdminCases"
              render={props => (
                <AdminCases token={sessionStorage.getItem("jwtToken")} />
              )}
            />
            <Route
              exact
              path="/AdminCases"
              render={props => (
                <AdminCases token={sessionStorage.getItem("jwtToken")} />
              )}
            />{" "}
          </div>{" "}
        </React.Fragment>{" "}
      </Router>
    );
  }
}
export default App;
