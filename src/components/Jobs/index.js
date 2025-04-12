import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Header from '../Header'
import Loading from '../Loading'
import Profile from '../Profile'
import JobsCard from '../JobsCard'
import Filter from '../Filter'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Jobs extends Component {
  state = {
    apiCallStatus: apiStatus.initial,
    search: '',
    employmentType: [],
    minimumPackage: '',
    jobsDetailsList: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  onChangeEmploymentList = id => {
    const {employmentType} = this.state
    let updatedone
    if (employmentType.includes(id)) {
      updatedone = employmentType.filter(each => each !== id)
    } else {
      updatedone = employmentType.concat(id)
    }

    this.setState({employmentType: updatedone}, this.getDetails)
  }

  onChangePackageList = id => {
    this.setState({minimumPackage: id}, this.getDetails)
  }

  getDetails = async () => {
    this.setState({apiCallStatus: apiStatus.progress})
    const {search, employmentType, minimumPackage} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updtatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiCallStatus: apiStatus.success,
        jobsDetailsList: updtatedData,
      })
    } else {
      this.setState({
        apiCallStatus: apiStatus.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobsDetailsList} = this.state
    const hasjobs = jobsDetailsList.length > 0

    return hasjobs ? (
      <div>
        {jobsDetailsList.map(each => (
          <JobsCard key={each.id} cardList={each} />
        ))}
      </div>
    ) : (
      <div className="NotfoundJobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container2">
      <Loading />
    </div>
  )

  renderFailureView = () => (
    <div className="failed">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <h2>Oops! Something Went Wrong</h2>
      <button
        id="button"
        onClick={this.getDetails}
        type="button"
        className="logout-btn"
      >
        Retry
      </button>
    </div>
  )

  renderDetailsCard = () => {
    const {apiCallStatus} = this.state
    switch (apiCallStatus) {
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

  submitForm = () => {
    this.getDetails()
  }

  onchangeingSearch = event => {
    this.setState({search: event.target.value})
    console.log(event.target.value)
  }

  render() {
    const {search} = this.state
    return (
      <div className="jobs-Conatianer">
        <Header />
        <div className="mainDetails-container">
          <div>
            <div className="searchForm-container-sm">
              <input
                value={search}
                onChange={this.onchangeingSearch}
                className="searchInput"
                type="search"
              />
              <button
                data-testid="searchButton"
                className="btn-search"
                onClick={this.submitForm}
                type="button"
              >
                <BsSearch className="searchicon" />
              </button>
            </div>
            <Profile />
            <Filter
              fun2={this.onChangePackageList}
              fun={this.onChangeEmploymentList}
            />
          </div>
          <div className="fafa">
            <div className="searchForm-container">
              <input
                value={search}
                onChange={this.onchangeingSearch}
                className="searchInput"
                type="search"
              />
              <button
                data-testid="searchButton"
                className="btn-search"
                onClick={this.submitForm}
                type="button"
              >
                <BsSearch className="searchicon" />
              </button>
            </div>
            {this.renderDetailsCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
