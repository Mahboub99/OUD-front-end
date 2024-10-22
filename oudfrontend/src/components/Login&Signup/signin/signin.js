import React, { Component } from 'react';
import '../signup/signup.css';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Validator from '../validate';
import { token } from '../../../utils/auth';
/**the sign up section  */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      email: '',
      password: '',
      passwordType: 'password',
      showText: 'show',
      rememberMe: false,
      redirect: false,
      formErrors: {
        mainError: '',
        EmailError: '',
        PasswordError: '',
      },
    };
  }
  /**
   * Email validation
   * (check if the email is valid)
   * @function
   * @param {object} event -the entered email
   * @returns {boolean} - return true if the email is valid
   */
  EmailHandel = (event) => {
    this.setState({ email: event.target.value });
    Validator.validateEmail(event.target.value, this);
  };
  /**
   * this function is for the show password button that check if i want it to be
   * a password or to be a text input
   * @function
   * @param {object} e
   * @returns {boolean} - if the the button is clicked it is check if i want to show the type is a password or as a text
   */
  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      passwordType: this.state.passwordType === 'text' ? 'password' : 'text',
      showText: this.state.showText === 'show' ? 'hide' : 'show',
    });
    return false;
  };
  /**
   * Password checker
   * (here check if the entered password is correct under some restricts)
   * 1)if it dose not enter any thing
   * 2)if it under 8 latter's
   * 3)if it more than 30 latter's
   * 5)if it is valid
   * 6)then it is correct
   * @function
   * @param {object} event - the entered password
   * @returns {string} -change the error massages
   *  */
  PasswordHandel = (event) => {
    this.setState({ password: event.target.value });
    Validator.validatePassword(event.target.value, this);
  };
  validateAll = () => {
    let valid = true;
    valid &= Validator.validateEmail(this.state.email, this);
    valid &= Validator.validatePassword(this.state.password, this);
    return valid;
  };
  /**
   * on submit send the email and password to back end to check it on the db
   * @function
   * @param {object} e
   * @returns {void}
   *   */
  handelSubmit = (e) => {
    e.preventDefault();

    let errorMassage = '';
    let toSent = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.validateAll()) {
      axios
        .post('https://oud-zerobase.me/api/v1/users/login', toSent)
        .then((response) => {
          if (response.status === 200) {
            const authToken = response.data.token;
            localStorage.setItem('accessToken', authToken);
            console.log('local', localStorage.getItem('accessToken'));
            console.log('token', authToken);
            console.log(response);
            window.location = '/';
          } else console.log(response);
        })
        .catch((error) => {
          errorMassage = error.response.data.message;
          console.log('error', error.response.data.message);
          this.setState((prevState) => {
            prevState.formErrors.mainError = errorMassage;
            return prevState;
          });
        });
    }
  };
  /**
   * the remember me check box
   * @function
   * @param {object} e
   * @returns {void}
   */
  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.setState({ [name]: value });
  };
  /**
   * here i render the page
   * @function
   * @returns {void}
   */
  render() {
    return (
      <div className="container main-center LoginPage ">
        <section className="social-form">
          <section className="main-form container SignUpForm">
            <form onSubmit={this.handelSubmit} noValidate>
              <div className="form-group sm-8">
                {this.state.formErrors.mainError && (
                  <span className="error">
                    {this.state.formErrors.mainError}
                  </span>
                )}
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control FormElement"
                  placeholder="email@address.com"
                  onChange={(this.handleChange, this.EmailHandel)}
                  data-testid="login-email"
                />
                {this.state.formErrors.EmailError.length > 0 && (
                  <span className="error" htmlFor="register-email">
                    {this.state.formErrors.EmailError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    required
                    name="password"
                    type={this.state.passwordType}
                    className="form-control FormElement"
                    placeholder={'password'}
                    onChange={(this.handleChange, this.PasswordHandel)}
                    data-testid="login-password"
                  />

                  <button
                    className="btn btn-outline-secondary showText "
                    onClick={this.handleShowPassword}
                    data-testid="login-button"
                  >
                    {this.state.showText}
                  </button>
                </div>
                {this.state.formErrors.PasswordError.length > 0 && (
                  <span className="error" htmlFor="register-password">
                    {this.state.formErrors.PasswordError}
                  </span>
                )}
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    style={{ display: 'inline', width: '20px' }}
                    type="checkbox"
                    class="custom-control-input"
                    id="customControlInline"
                    name="rememberMe"
                    onChange={this.handleChange}
                  />
                  <label class="custom-control-label" for="customControlInline">
                    Remember me
                  </label>
                </div>
              </div>
              <section className="container main-center forgetLink">
                <h6 className="hint-text-forgot">
                  <button
                    type="button"
                    className="btn btn-outline-link forgetBtn"
                    data-testid="Forgetpass"
                    onClick={this.handelSubmit}
                  >
                    <Link className="forget" to="/forgot-password">
                      Forgot your password?
                    </Link>
                  </button>
                </h6>
              </section>
              <button
                type="submit"
                className="btn SignUpSubmit btn-block"
                data-testid="SignInBtns"
              >
                Sign In
              </button>
              <section className="or-seperator-2"></section>
              <section className="container main-center forgetLink ">
                <span>
                  <h6 className="hint">
                    Don't have an account?
                    <br />
                  </h6>
                  <button
                    data-testid="SignUpBtn"
                    type="button"
                    className="btn SignUpSubmit btn-block"
                  >
                    <Link to="/SignUp" className="btn-style butt">
                      SIGN UP
                    </Link>
                  </button>
                </span>
              </section>
            </form>
          </section>
        </section>
      </div>
    );
  }
}

export default SignIn;
