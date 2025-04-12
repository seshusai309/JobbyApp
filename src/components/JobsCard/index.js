import {Component} from 'react'
import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

class JobsCard extends Component {
  render() {
    const {cardList} = this.props
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = cardList
    return (
      <div className="main">
        <Link to={`/jobs/${id}`}>
          <div className="jobsDetailContainer">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="sub1">
              <h1 className="sub1-sm">{title}</h1>
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
                <p className="icon-tada-para">{location}</p>
              </div>
              <div className="icon-tada">
                <BsBriefcaseFill className="locationIcn" />
                <p className="icon-tada-para">{employmentType}</p>
              </div>
            </div>
            <h1 className="package-sm">{packagePerAnnum}</h1>
          </div>
          <hr className="line" />
          <div>
            <h1 className="desc-sm">Description</h1>
            <p className="jobpara">{jobDescription}</p>
          </div>
        </Link>
      </div>
    )
  }
}

export default JobsCard
