import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import Loading from '../Loading'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Profile extends Component {
  state = {apiStatusView: apiStatus.initial, jobDetails: {}, similarJobs: []}

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

    const {match} = this.props
    const {params} = match
    const {id} = params
    const cleanId = id.replace(/^:/, '')

    const url = `https://apis.ccbp.in/jobs/${cleanId}`
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedJobsdetailsList = {
        companyWebsiteUrl: jobDetails.company_website_url,
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        skills: jobDetails.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }
      const similarJobsList = data.similar_jobs
      const updatedSimilarJobsList = similarJobsList.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedJobsdetailsList)
      this.setState({
        apiStatusView: apiStatus.success,
        jobDetails: updatedJobsdetailsList,
        similarJobs: updatedSimilarJobsList,
      })
    } else {
      this.setState({apiStatusView: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loadINdetails">
      <Loading />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyWebsiteUrl,
      companyLogoUrl,
      employmentType,
      skills,
      lifeAtCompany,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="detaling-container">
        <Header />
        <div className="sub-detailing wow">
          <div className="jobsDetailContainer">
            <img src={companyLogoUrl} alt="job details company logo" />
            <div className="sub1">
              <h1>{title}</h1>
              <div className="starDiv">
                <FaStar className="starImg" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="sasa">
            <div className="tada">
              <div className="icon-tada">
                <MdLocationOn className="locationIcn" />
                <p>{location}</p>
              </div>
              <div className="icon-tada">
                <BsBriefcaseFill className="locationIcn" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="visited">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>
              Visit <FaExternalLinkAlt />
            </a>
          </div>
          <p className="desc">{jobDescription}</p>
          <h1 className="skillsHead">Skills</h1>
          <div className="skills">
            {skills.map(each => (
              <div key={each.name} className="sub-skills">
                <img src={each.imageUrl} alt={each.name} />
                <p>{each.name}</p>
              </div>
            ))}
          </div>
          <h1>Life at company</h1>
          <div className="lifeAtCompany">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="heading">Similar Jobs</h1>
        <div className="whats">
          {similarJobs.map(each => (
            <SimilarJobs key={each.id} values={each} />
          ))}
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="faildetailsjobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
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

export default withRouter(Profile)
