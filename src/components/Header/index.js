import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsBriefcaseFill} from 'react-icons/bs'
import {IoMdHome} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  LogoutHome = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav>
        <div className="header-container">
          <Link to="/">
            <img
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="tada">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
          </ul>
          <ul>
            <li>
              <button
                onClick={this.LogoutHome}
                className="logout-btn navs"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="mobile-view">
          <Link to="/">
            <img
              className="logo-image-sm"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="tada">
            <li>
              <Link to="/">
                <IoMdHome />
              </Link>
            </li>
            <li>
              <Link to="/jobs">
                <BsBriefcaseFill />
              </Link>
            </li>
            <li>
              <button onClick={this.LogoutHome} className="btssm" type="button">
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
