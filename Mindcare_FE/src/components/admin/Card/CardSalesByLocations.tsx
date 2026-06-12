import React from 'react'
import SalesDonutChart from '../Charts/SalesDonutChart'

interface LocationData {
  city: string
  percent: number
}

const LOCATIONS: LocationData[] = [
  { city: 'Hanoi', percent: 75 },
  { city: 'Ho Chi Minh', percent: 47 },
  { city: 'Da Nang', percent: 82 },
]

const CardSalesByLocations = () => {
  return (
    <div className="card card-height-100">
      <div className="card-header align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Sales by Locations</h4>
        <div className="flex-shrink-0">
          <button type="button" className="btn btn-soft-primary material-shadow-none btn-sm">
            Export Report
          </button>
        </div>
      </div>

      <div className="card-body">
        <SalesDonutChart />

        <div className="px-2 py-2 mt-1">
          {LOCATIONS.map(loc => (
            <div key={loc.city}>
              <p className="mb-1">
                {loc.city} <span className="float-end">{loc.percent}%</span>
              </p>
              <div className="progress mt-2" style={{ height: 6 }}>
                <div
                  className="progress-bar progress-bar-striped bg-primary"
                  role="progressbar"
                  style={{ width: `${loc.percent}%` }}
                  aria-valuenow={loc.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              {loc.city !== LOCATIONS[LOCATIONS.length - 1].city && (
                <div style={{ marginTop: 12 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardSalesByLocations
