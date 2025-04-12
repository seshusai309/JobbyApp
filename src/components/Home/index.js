import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-Container">
        <Header />
        <div className="description-container">
          <h1 className="description-container-h1">
            Find The Job That <br /> Fits Your Life
          </h1>
          <h1 className="wala">Find The Job That Fits Your Life</h1>
          <p className="description-container-p">
            Millions of people are searching for jobs, salary information,
            company reviews, find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="logout-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
