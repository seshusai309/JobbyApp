import {Component} from 'react'
import Cookies from 'js-cookie'

import Loading from '../Loading'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Profile extends Component {
  state = {apiStatusView: apiStatus.initial, profiledetails: {}}

  componentDidMount() {
    this.getdetails()
  }

  getdetails = async () => {
    this.setState({apiStatusView: apiStatus.progress})
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const details = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({apiStatusView: apiStatus.success, profiledetails: details})
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loadingViewOfprofile">
      <Loading />
    </div>
  )

  renderSuccessView = () => {
    const {profiledetails} = this.state
    const {name, profileImageUrl, shortBio} = profiledetails
    return (
      <div className="profile-container">
        <img className="sm-img" alt="profile" src={profileImageUrl} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failProfile">
      <button
        id="button"
        onClick={this.getdetails}
        type="button"
        className="logout-btn"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatusView} = this.state
    switch (apiStatusView) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.progress:
        return this.renderLoadingView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default Profile
