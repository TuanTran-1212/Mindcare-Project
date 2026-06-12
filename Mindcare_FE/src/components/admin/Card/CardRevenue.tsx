import React from 'react'
import { useState } from 'react'
import RevenueChart from '../Charts/RevenueChart'

const PERIODS = ['ALL', '1M', '6M', '1Y'] as const
type Period = typeof PERIODS[number]

interface RevenueStat {
  label: string
  value: string
}

const STATS: RevenueStat[] = [
  { label: 'Orders', value: '7,585' },
  { label: 'Earnings', value: '$22.89k' },
  { label: 'Refunds', value: '367' },
  { label: 'Conversation Ratio', value: '18.92%' },
]

const CardRevenue = () => {
  const [activePeriod, setActivePeriod] = useState<Period>('1Y')

  return (
    <div className="card">
      <div className="card-header border-0 align-items-center d-flex">
        <h4 className="card-title mb-0 flex-grow-1">Revenue</h4>
        <div>
          {PERIODS.map(p => (
            <button
              key={p}
              type="button"
              className={`btn material-shadow-none btn-sm me-1 ${
                activePeriod === p ? 'btn-soft-primary' : 'btn-soft-secondary'
              }`}
              onClick={() => setActivePeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats header */}
      <div className="card-header p-0 border-0 bg-light-subtle">
        <div className="row g-0 text-center">
          {STATS.map((stat, i) => (
            <div className="col-6 col-sm-3" key={stat.label}>
              <div className={`p-3 border border-dashed border-start-0${i === STATS.length - 1 ? ' border-end-0' : ''}`}>
                <h5 className={`mb-1${stat.label === 'Conversation Ratio' ? ' text-success' : ''}`}>
                  {stat.value}
                </h5>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-body p-0 pb-2">
        <div className="w-100">
          <RevenueChart />
        </div>
      </div>
    </div>
  )
}

export default CardRevenue
