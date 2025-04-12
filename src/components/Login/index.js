import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {FaGithub} from 'react-icons/fa'

import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
    errorStatus: false,
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderusername = () => {
    const {usernameInput} = this.state
    return (
      <>
        <label
          placeholder="username"
          className="labelHeading"
          htmlFor="username"
        >
          USERNAME
        </label>
        <input
          className="input-style"
          type="text"
          id="username"
          placeholder="username"
          value={usernameInput}
          name="username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderpassword = () => {
    const {passwordInput} = this.state
    return (
      <>
        <label className="labelHeading" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          name="password"
          onChange={this.onChangePassword}
          className="input-style"
          type="password"
          placeholder="password"
          value={passwordInput}
        />
      </>
    )
  }

  OnsuccessView = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  submitform = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.OnsuccessView(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, errorStatus: true})
    }
  }

  render() {
    const {errorStatus, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitform}>
          <img
            className="logo-image imged"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderusername()}
          {this.renderpassword()}
          <button className="logout-btn bts" type="submit">
            Login
          </button>
          {errorStatus && <p className="error">{`*${errorMsg}`}</p>}
          <div className="gitstyle">
            <p>Get the Username, Password From My Git</p>
            <a
              href="https://github.com/seshusai309/JobbyApp"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="icon" />
            </a>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
