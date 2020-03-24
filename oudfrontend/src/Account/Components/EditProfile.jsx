import React, { Component } from "react";
import ProfileInfo from "../General/DummyMock";
import Country from "../General/Country";
import UserExperinceForm from "./UserExperinceForm";
import EditProfileTextElement from "./EditProfileTextElement";

import "../CssFiles/EditProfile.css";

function EditCountry(props) {
  return (
    <div id={props.id} className="EditProfileDropElement">
      <p className="editMetaData">Country</p>
      <Country
        class={props.class}
        default={props.default}
        handeler={props.handeler}
      />
    </div>
  );
}
function EditGendr(props) {
  return (
    <div className="EditProfileDropElement">
      <p className="editMetaData">{props.metaData}</p>
      <select
        id={props.id}
        className={props.class}
        defaultValue={props.value}
        onChange={props.handeler}
      >
        <option value="Male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
}

function formValid({ formErrors, ...rest }) {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
}

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ProfileInfo.email,
      gender: ProfileInfo.Gender,
      dateOfBirth: ProfileInfo.birthDate,
      country: ProfileInfo.country,
      displayName: ProfileInfo.displayName,
      password: "",
      formNotValid: "",
      formSaved: "",
      formErrors: {
        emailError: "",
        displayNameError: "",
        passwordErorr: ""
      }
    };
    this.emailHandelChange = this.emailHandelChange.bind(this);
    this.genderHandelChange = this.genderHandelChange.bind(this);
    this.dateOfBirthHandelChange = this.dateOfBirthHandelChange.bind(this);
    this.countryHandelChange = this.countryHandelChange.bind(this);
    this.displayNameHandelChange = this.displayNameHandelChange.bind(this);
    this.passwordHandelChange = this.passwordHandelChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  emailHandelChange(event) {
    this.setState({ email: event.target.value });
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    let formErrors = { ...this.state.formErrors };
    formErrors.emailError = emailRegex.test(event.target.value)
      ? ""
      : "invalid email address";
    this.setState({ formErrors });
  }
  genderHandelChange(event) {
    this.setState({ gender: event.target.value });
  }
  dateOfBirthHandelChange(event) {
    this.setState({ dateOfBirth: event.target.value });
  }
  countryHandelChange(event) {
    this.setState({ country: event.target.value });
  }
  displayNameHandelChange(event) {
    this.setState({ displayName: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.displayNameError =
      event.target.value.length < 3 ? "minimum 3 characaters required" : "";
    this.setState({ formErrors });
  }
  passwordHandelChange(event) {
    this.setState({ oldPassword: event.target.value });
    let formErrors = { ...this.state.formErrors };
    formErrors.passwordErorr =
      event.target.value !== ProfileInfo.password
        ? "Invallid password not matched"
        : "";
    this.setState({ formErrors });
  }
  handelSubmit(event) {
    event.preventDefault();

    const disablePassword =
      ProfileInfo.email === this.state.email &&
      ProfileInfo.Gender === this.state.gender &&
      ProfileInfo.displayName === this.state.displayName &&
      ProfileInfo.country === this.state.country &&
      ProfileInfo.birthDate === this.state.dateOfBirth;

    if (disablePassword) {
      this.setState({ formValid: "", password: "" });
    } else if (formValid(this.state)) {
      //make a request
      this.setState({
        formNotValid: "",
        formSaved: "Profile saved successfully"
      });
    } else {
      this.setState({
        formNotValid: "please , check the required feilds",
        formSaved: ""
      });
    }
  }

  render() {
    const disablePassword =
      ProfileInfo.email === this.state.email &&
      ProfileInfo.Gender === this.state.gender &&
      ProfileInfo.displayName === this.state.displayName &&
      ProfileInfo.country === this.state.country &&
      ProfileInfo.birthDate === this.state.dateOfBirth;
    return (
      <div className="accountContainer">
        <h2 className="settingTitle"> Edit profile </h2>

        <div className="accountCard">
          <form className="editProfileElement" onSubmit={this.handelSubmit}>
            {this.state.formNotValid.length > 0 && (
              <div className="formSubmitErorr">{this.state.formNotValid}</div>
            )}
            {this.state.formSaved.length > 0 && (
              <div className="formSubmitSaved">{this.state.formSaved}</div>
            )}
            <EditProfileTextElement
              id="displayName"
              metaData="Display Name"
              value={ProfileInfo.displayName}
              class="editInput"
              type="text"
              handeler={this.displayNameHandelChange}
            />
            {this.state.formErrors.displayNameError.length > 0 && (
              <span className="error">
                {this.state.formErrors.displayNameError}
              </span>
            )}
            <EditProfileTextElement
              id="email"
              metaData="Email"
              value={ProfileInfo.email}
              class="editInput"
              type="text"
              handeler={this.emailHandelChange}
            />
            {this.state.formErrors.emailError.length > 0 && (
              <span className="error">{this.state.formErrors.emailError}</span>
            )}
            <EditGendr
              id="gender"
              metaData="Gender"
              value={ProfileInfo.Gender}
              class="editInput"
              handeler={this.genderHandelChange}
            />
            <EditProfileTextElement
              id="dateOfBirth"
              metaData="Date of birth"
              value={ProfileInfo.birthDate}
              class="editInput"
              type="date"
              handeler={this.dateOfBirthHandelChange}
            />
            <EditCountry
              id="editCountrty"
              class="editInput"
              default={ProfileInfo.country}
              handeler={this.countryHandelChange}
            />
            <EditProfileTextElement
              id="confirimPassword"
              metaData="Confirm password"
              class="editInput"
              type="password"
              disable={disablePassword}
              handeler={this.passwordHandelChange}
            />
            {this.state.formErrors.passwordErorr.length > 0 &&
              !disablePassword && (
                <span className="error">
                  {this.state.formErrors.passwordErorr}
                </span>
              )}
            <p style={{ marginTop: "30px" }}>
              Oud keeps your information alawys secret !
            </p>
            <div className="rightSaveProfile">
              <button type="button" className="btn btn-light cancle">
                CANCLE
              </button>
              <input
                className="btn btn-warning submit"
                type="submit"
                value="SAVE PROFILE"
              />
            </div>
          </form>
        </div>

        <UserExperinceForm />
      </div>
    );
  }
}

export default EditProfile;
