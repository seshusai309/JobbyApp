import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Filter extends Component {
  checkedBox = event => {
    const {fun} = this.props
    fun(event.target.value)
  }

  checkedBox2 = event => {
    const {fun2} = this.props
    fun2(event.target.value)
  }

  render() {
    return (
      <div className="filterContainer">
        <hr className="hrLine" />
        <ul>
          <li>
            <h1 className="types-heading">Type of Employment</h1>
          </li>
          {employmentTypesList.map(each => (
            <li key={each.label}>
              <label>
                <input
                  onClick={this.checkedBox}
                  type="checkbox"
                  value={each.employmentTypeId}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="hrLine" />
        <ul>
          <li>
            <h1 className="types-heading">Salary Range</h1>
          </li>
          {salaryRangesList.map(each => (
            <li key={each.label}>
              <label>
                <input
                  onClick={this.checkedBox2}
                  type="radio"
                  name="options"
                  value={each.salaryRangeId}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Filter
