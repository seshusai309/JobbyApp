import {Component} from 'react'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

class SimilarJobs extends Component {
  render() {
    const {values} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = values
    return (
      <div className="dodo">
        <div className="similarjobsCard">
          <img src={companyLogoUrl} alt="similar job company logo" />
          <div>
            <h1>{title}</h1>
            <div className="sub-class">
              <FaStar className="starImg" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="every_desc">Description</h1>
          <p>{jobDescription}</p>
        </div>
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
      </div>
    )
  }
}

export default SimilarJobs
